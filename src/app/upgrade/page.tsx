"use client";

import { useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

export default function UpgradePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const paidTiers = pricingTiers.filter((tier) => tier.priceId);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async (priceId?: string) => {
    if (!priceId) return;
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before upgrading your plan.",
        variant: "destructive",
      });
      return;
    }
    if (!firestore || isCheckingOut) return;

    setIsCheckingOut(true);

    try {
      const checkoutSessionsRef = collection(
        firestore,
        "customers",
        user.uid,
        "checkout_sessions"
      );
      const origin = window.location.origin;
      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: `${origin}/upgrade?success=true`,
        cancel_url: `${origin}/upgrade?canceled=true`,
      });

      const unsubscribe = onSnapshot(docRef, (snap) => {
        const data = snap.data() as { url?: string; error?: { message?: string } } | undefined;
        if (!data) return;
        if (data.error?.message) {
          unsubscribe();
          setIsCheckingOut(false);
          toast({
            title: "Checkout failed",
            description: data.error.message,
            variant: "destructive",
          });
          return;
        }
        if (data.url) {
          unsubscribe();
          setIsCheckingOut(false);
          window.location.assign(data.url);
        }
      });
    } catch (error) {
      setIsCheckingOut(false);
      console.error("Failed to start checkout session", error);
      toast({
        title: "Checkout failed",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">Choose Your Plan</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick the level of AI-guided coaching that fits your goals. Upgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {paidTiers.map((tier) => {
          const disabled = isUserLoading || !user || isCheckingOut;
          return (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col cursor-pointer transition-shadow hover:shadow-md",
                tier.popular && "border-primary ring-2 ring-primary shadow-lg"
              )}
              role="link"
              tabIndex={0}
              onClick={() => handleCheckout(tier.priceId)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCheckout(tier.priceId);
                }
              }}
            >
              {tier.popular && (
                <Badge className="w-fit self-center -mt-4 bg-primary">Most Popular</Badge>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  className="w-full mt-6"
                  variant={tier.buttonVariant as any}
                  data-price-id={tier.priceId}
                  disabled={disabled}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCheckout(tier.priceId);
                  }}
                >
                  {!user ? "Sign in to upgrade" : tier.buttonText}
                </Button>
                {tier.name === "Bill Bully Pro" && (
                  <p className="text-xs text-muted-foreground">Coaching only. No actions taken without you.</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        BillBully provides educational and coaching tools. We do not provide legal or financial advice.
      </p>
    </div>
  );
}
