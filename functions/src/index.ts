import {onCall, HttpsError} from "firebase-functions/v2/https";
import {
  onDocumentCreated,
  onDocumentWritten,
} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {FieldValue, getFirestore} from "firebase-admin/firestore";

initializeApp();

export const deleteUserAccount = onCall(
  {region: "us-east4"},
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError(
        "unauthenticated",
        "You must be signed in to delete your account."
      );
    }

    const uid = request.auth.uid;
    const firestore = getFirestore();

    try {
      await Promise.all([
        firestore.recursiveDelete(firestore.doc(`users/${uid}`)),
        firestore.recursiveDelete(firestore.doc(`customers/${uid}`)),
      ]);
      await getAuth().deleteUser(uid);
      return {success: true};
    } catch (error) {
      console.error("Failed to delete user account", error);
      throw new HttpsError(
        "internal",
        "Failed to delete user data. Please try again."
      );
    }
  }
);

/**
 * Builds a prompt template based on the request intent and user input.
 */
function buildPrompt({
  intent,
  userText = "",
}: {
  intent?: string;
  userText?: string;
}) {
  const base =
    "You are BillBully: calm, honest, grounded. Output should be ready-to-use.";

  const templates: Record<string, string> = {
    bills: `${base}
Create a ready-to-use bill negotiation script.
Be concise, confident, and polite.
Ask at most 2 questions if key details are missing,
then provide a best-guess script anyway.
Include: opener, leverage points, close, fallback.
User context: ${userText}`,
    credit: `${base}
Help with credit report items.
Ask at most 2 questions,
then provide a clear plan and a draft dispute letter template.
Be conservative and avoid unverifiable legal claims.
Use best-practice structure.
User context: ${userText}`,
    subscriptions: `${base}
Create a cancellation message and (optional)
retention negotiation script.
Ask at most 2 questions, then provide: short email + phone script +
"if they push back" line.
User context: ${userText}`,
    compliance: `${base}
Explain compliance considerations for credit/billing disputes.
Be conservative and avoid legal-advice phrasing.
Give checklist-style guidance and safe next steps.
User context: ${userText}`,
    chat: `${base}
Start with 3 quick questions to diagnose whether the user needs bills,
credit, or subscriptions help.
Then recommend the next best action.
User context: ${userText}`,
  };

  return templates[intent || ""] || `${base}\nUser context: ${userText}`;
}

export const forwardAiRequestToGenerate = onDocumentCreated(
  {document: "aiRequests/{requestId}", region: "us-east4"},
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const requestId = event.params.requestId as string;

    if (data.status && data.status !== "queued") return;

    const prompt = buildPrompt({
      intent: data.intent,
      userText: data.userText,
    });

    await snap.ref.update({
      status: "processing",
      processedAt: FieldValue.serverTimestamp(),
    });

    const firestore = getFirestore();
    const genRef = await firestore.collection("generate").add({
      prompt,
      intent: data.intent || null,
      userId: data.userId || null,
      source: data.source || null,
      requestId,
      createdAt: FieldValue.serverTimestamp(),
    });

    await snap.ref.update({
      generateDocId: genRef.id,
      status: "sent_to_generate",
    });
  }
);

/**
 * Extracts a model response string from the extension output payload.
 */
function extractReply(data: Record<string, unknown>) {
  const output = data.output as Record<string, unknown> | undefined;
  const result = data.result as Record<string, unknown> | undefined;
  const candidates =
    result?.candidates as Array<Record<string, unknown>> | undefined;
  const candidate = candidates?.[0] as Record<string, unknown> | undefined;
  const content = candidate?.content as Record<string, unknown> | undefined;
  const parts = content?.parts as Array<Record<string, unknown>> | undefined;
  const partText = parts?.[0]?.text as string | undefined;

  return (
    (data.response as string | undefined) ||
    (data.text as string | undefined) ||
    (data.message as string | undefined) ||
    (data.content as string | undefined) ||
    (output?.text as string | undefined) ||
    (output?.content as string | undefined) ||
    (result?.text as string | undefined) ||
    (result?.outputText as string | undefined) ||
    partText
  );
}

export const syncGenerateToRequest = onDocumentWritten(
  {document: "generate/{docId}", region: "us-east4"},
  async (event) => {
    const data =
      event.data?.after?.data() as Record<string, unknown> | undefined;
    if (!data) return;

    const requestId = data.requestId as string | undefined;
    if (!requestId) return;

    const firestore = getFirestore();
    const requestRef = firestore.doc(`aiRequests/${requestId}`);

    const errorMessage =
      (data.error as { message?: string } | undefined)?.message ||
      (data.error as string | undefined);
    const reply = extractReply(data);

    if (errorMessage) {
      await requestRef.set(
        {
          status: "failed",
          error: {message: String(errorMessage)},
        },
        {merge: true}
      );
      return;
    }

    if (reply) {
      await requestRef.set(
        {
          status: "completed",
          response: reply,
        },
        {merge: true}
      );
    }
  }
);
