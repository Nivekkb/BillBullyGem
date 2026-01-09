"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

export default function UpgradePage() {
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const paidTiers = pricingTiers.filter((tier) => tier.priceId);

  const openPaymentLink = (url?: string) => {
    if (!url) return;
    window.location.href = url;
  };

  const handleCheckout = (priceId?: string, paymentLink?: string) => {
    if (!priceId || !paymentLink) return;
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before upgrading your plan.",
        variant: "destructive",
      });
      return;
    }
    openPaymentLink(paymentLink);
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
          const disabled = isUserLoading || !user;
          const paymentLink = tier.paymentLink ?? tier.buttonHref;
          return (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col cursor-pointer transition-shadow hover:shadow-md",
                tier.popular && "border-primary ring-2 ring-primary shadow-lg"
              )}
              role="link"
              tabIndex={0}
              onClick={() => handleCheckout(tier.priceId, paymentLink)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCheckout(tier.priceId, paymentLink);
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
                    handleCheckout(tier.priceId, paymentLink);
                  }}
                >
                  {!user ? "Sign in to upgrade" : tier.buttonText}
                </Button>
                {tier.name === "Bill Bully Pro" && (
                  <p className="text-xs text-muted-foreground">Coaching only. No actions taken without you.</p>
                )}
                {tier.qrImage && (
                  <div className="pt-2 flex flex-col items-center">
                    <img
                      src={tier.qrImage}
                      alt={`${tier.name} payment QR`}
                      className="h-24 w-24 rounded-md border border-border/60 bg-white p-1"
                    />
                  </div>
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
