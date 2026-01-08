
export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link";
  popular?: boolean;
  buttonHref: string;
  priceId?: string;
  emotionalBenefit?: string;
};

export const pricingTiers: PricingTier[] = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Try BillBully risk-free",
        features: [
            "Connect 1 bank account",
            "View bills & subscriptions",
            "1 free bill negotiation",
            "Credit score once/year",
        ],
        buttonText: "Get Started Free",
        buttonVariant: "outline",
        buttonHref: "/dashboard"
    },
    {
        name: "Bill Bully Pro",
        price: "$19.99",
        period: "/month",
        description: "Maximize your savings",
        features: [
            "Negotiate all bills quarterly",
            "Cancel unlimited subscriptions",
            "Savings analytics dashboard",
            "Priority support",
            "Bill tracking alerts"
        ],
        buttonText: "Start Pro Trial",
        buttonVariant: "default",
        popular: false,
        buttonHref: "/dashboard",
        priceId: "price_1SmcXj5E116UcrqA55uBncnJ"
    },
    {
        name: "Credit Bully",
        price: "$49.99",
        period: "/month",
        description: "Full credit repair suite",
        features: [
            "All Bill Bully Pro features",
            "Dispute negative credit items",
            "Automated debt validation",
            "Goodwill letter campaigns",
            "Monthly credit score updates",
            "3-bureau monitoring (US)"
        ],
        buttonText: "Start Credit Repair",
        buttonVariant: "default",
        popular: true,
        buttonHref: "/dashboard",
        priceId: "price_1Smcfr5E116UcrqApxRk4sYb"
    },
    {
        name: "Ultimate Bundle",
        price: "$59.99",
        period: "/month",
        description: "Best value for serious savers",
        features: [
            "Everything in Credit Bully",
            "Save $10/month",
            "Dedicated account manager",
            "Annual financial review",
            "VIP support queue"
        ],
        buttonText: "Get Ultimate",
        buttonVariant: "default",
        popular: false,
        buttonHref: "/dashboard",
        priceId: "price_1SmciJ5E116UcrqA95E7zJuD"
    }
];
