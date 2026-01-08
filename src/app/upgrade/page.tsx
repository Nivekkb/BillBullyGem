"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";
import { useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

export default function UpgradePage() {
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const isProd = process.env.NODE_ENV === "production";
  const checkoutBaseUrl = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL || "";
  const checkoutEnabled = !isProd || Boolean(checkoutBaseUrl);

  const paidTiers = pricingTiers.filter((tier) => tier.priceId);

  const handleCheckout = (priceId?: string) => {
    if (!priceId) return;
    if (isProd && !user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before upgrading your plan.",
        variant: "destructive",
      });
      return;
    }
    if (!checkoutEnabled) {
      toast({
        title: "Checkout not configured",
        description: "Billing is not enabled yet in production.",
        variant: "destructive",
      });
      return;
    }
    if (isProd) {
      window.location.href = `${checkoutBaseUrl}?priceId=${priceId}`;
      return;
    }
    toast({
      title: "Dev mode checkout",
      description: `Would start checkout for ${priceId}.`,
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">Choose Your Plan</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick the level of AI-guided coaching that fits your goals. Upgrade anytime.
        </p>
        {isProd && !checkoutEnabled && (
          <p className="mt-3 text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" /> Billing is not enabled yet. You can explore plans risk-free.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {paidTiers.map((tier) => {
          const disabled = isUserLoading || (isProd && !user) || !checkoutEnabled;
          return (
            <Card key={tier.name} className={cn("flex flex-col", tier.popular && "border-primary ring-2 ring-primary shadow-lg")}>
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
                  onClick={() => handleCheckout(tier.priceId)}
                >
                  {isProd && !user ? "Sign in to upgrade" : tier.buttonText}
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
