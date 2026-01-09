"use client";

import { useMemo, useState } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFirestore, useUser } from "@/firebase";

type Bill = {
  companyName?: string;
  category?: string;
  status?: string;
  currentAmount?: number;
  savingsAmount?: number;
  createdAt?: { toDate?: () => Date } | string;
};

type CreditItem = {
  bureau?: string;
  accountName?: string;
  type?: string;
  status?: string;
  disputeDate?: string;
};

type Subscription = {
  serviceName?: string;
  amount?: number;
  billingFrequency?: string;
  status?: string;
  createdAt?: { toDate?: () => Date } | string;
};

type ComplianceCheck = {
  featureDescription?: string;
  relevantLaws?: string;
  result?: {
    isCompliant?: boolean;
    complianceRationale?: string;
    suggestedAdjustments?: string;
  };
  createdAt?: { toDate?: () => Date } | string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AiChatPanelProps = {
  bills: Bill[] | null;
  creditItems: CreditItem[] | null;
  subscriptions: Subscription[] | null;
  complianceChecks: ComplianceCheck[] | null;
  className?: string;
};

const quickPrompts = [
  "Talk to me about my bills",
  "Talk to me about my credit",
  "Talk to me about my subscriptions",
  "Talk to me about compliance",
  "Hey, just talk to me",
];

function normalizeDate(value?: { toDate?: () => Date } | string) {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (value.toDate) return value.toDate().toISOString();
  return undefined;
}

export function AiChatPanel({
  bills,
  creditItems,
  subscriptions,
  complianceChecks,
  className,
}: AiChatPanelProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask me about your bills, credit, or subscriptions and we can discuss how to move forward",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const context = useMemo(
    () => ({
      bills:
        bills?.map((bill) => ({
          companyName: bill.companyName,
          category: bill.category,
          status: bill.status,
          currentAmount: bill.currentAmount,
          savingsAmount: bill.savingsAmount,
          createdAt: normalizeDate(bill.createdAt),
        })) ?? [],
      creditItems:
        creditItems?.map((item) => ({
          bureau: item.bureau,
          accountName: item.accountName,
          type: item.type,
          status: item.status,
          disputeDate: item.disputeDate,
        })) ?? [],
      subscriptions:
        subscriptions?.map((sub) => ({
          serviceName: sub.serviceName,
          amount: sub.amount,
          billingFrequency: sub.billingFrequency,
          status: sub.status,
          createdAt: normalizeDate(sub.createdAt),
        })) ?? [],
      complianceChecks:
        complianceChecks?.map((check) => ({
          featureDescription: check.featureDescription,
          relevantLaws: check.relevantLaws,
          isCompliant: check.result?.isCompliant,
          complianceRationale: check.result?.complianceRationale,
          suggestedAdjustments: check.result?.suggestedAdjustments,
          createdAt: normalizeDate(check.createdAt),
        })) ?? [],
    }),
    [bills, creditItems, subscriptions, complianceChecks]
  );

  const detectIntent = (text: string) => {
    const normalized = text.toLowerCase();
    if (normalized.includes("bill")) return "bills";
    if (normalized.includes("credit")) return "credit";
    if (normalized.includes("subscription")) return "subscriptions";
    if (normalized.includes("compliance")) return "compliance";
    return "chat";
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsSending(true);

    try {
      if (!user) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Please sign in to use the AI coach.",
          },
        ]);
        return;
      }

      const requestRef = await addDoc(collection(firestore, "aiRequests"), {
        intent: detectIntent(trimmed),
        userText: `${trimmed}\n\nContext:\n${JSON.stringify(context)}`,
        userId: user.uid,
        source: "dashboard",
        status: "queued",
        createdAt: serverTimestamp(),
      });

      const requestUnsub = onSnapshot(requestRef, (snap) => {
        const data = snap.data() as
          | { response?: string; error?: { message?: string } }
          | undefined;
        if (!data) return;
        if (data.error?.message) {
          requestUnsub();
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.error?.message,
            },
          ]);
          return;
        }
        if (data.response) {
          requestUnsub();
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.response,
            },
          ]);
        }
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I hit a snag talking to the AI service. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="font-headline">AI Coach</CardTitle>
        <p className="text-sm text-muted-foreground">
          Coaching only. You choose what to send and when.
        </p>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-border/40 bg-card/40 p-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                "max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-background/80 text-foreground"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask about your bills, credit, or subscriptions..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <Button type="button" disabled={isSending} onClick={() => sendMessage(input)}>
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
