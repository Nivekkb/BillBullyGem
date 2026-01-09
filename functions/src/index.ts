import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

export const deleteUserAccount = onCall(async (request) => {
  if (!request.auth?.uid) {
    throw new HttpsError("unauthenticated", "You must be signed in to delete your account.");
  }

  const uid = request.auth.uid;
  const firestore = getFirestore();

  try {
    await Promise.all([
      firestore.recursiveDelete(firestore.doc(`users/${uid}`)),
      firestore.recursiveDelete(firestore.doc(`customers/${uid}`)),
    ]);
    await getAuth().deleteUser(uid);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user account", error);
    throw new HttpsError("internal", "Failed to delete user data. Please try again.");
  }
});
