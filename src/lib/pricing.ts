
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
  paymentLink?: string;
  qrImage?: string;
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
            "Guided bill negotiation coaching (quarterly)",
            "Step-by-step subscription cancellation guidance",
            "Savings analytics dashboard",
            "Priority support",
            "Bill tracking alerts"
        ],
        buttonText: "Start Pro Trial",
        buttonVariant: "default",
        popular: false,
        buttonHref: "https://buy.stripe.com/cNiaEQ0KMgNJeFT4DpgMw01",
        paymentLink: "https://buy.stripe.com/cNiaEQ0KMgNJeFT4DpgMw01",
        qrImage: "/pro.png",
        priceId: "price_1SmcXj5E116UcrqA55uBncnJ"
    },
    {
        name: "Credit Bully",
        price: "$49.99",
        period: "/month",
        description: "Full credit repair suite",
        features: [
            "All Bill Bully Pro features",
            "Guided dispute preparation for negative credit items",
            "Debt validation letter assistance",
            "Goodwill letter drafting tools",
            "Monthly credit score updates",
            "3-bureau monitoring (US)"
        ],
        buttonText: "Start Credit Coaching",
        buttonVariant: "default",
        popular: true,
        buttonHref: "https://buy.stripe.com/7sY7sEfFG2WTapD8TFgMw02",
        paymentLink: "https://buy.stripe.com/7sY7sEfFG2WTapD8TFgMw02",
        qrImage: "/creditbully.png",
        priceId: "price_1Smcfr5E116UcrqApxRk4sYb"
    },
    {
        name: "Ultimate Bundle",
        price: "$59.99",
        period: "/month",
        description: "Best for people actively negotiating bills and repairing credit",
        features: [
            "Everything in Credit Bully",
            "Save $10/month",
            "Priority coaching access",
            "Annual financial review",
            "VIP support queue"
        ],
        buttonText: "Start Ultimate Coaching",
        buttonVariant: "default",
        popular: false,
        buttonHref: "https://buy.stripe.com/9B65kweBCgNJ2Xb8TFgMw00",
        paymentLink: "https://buy.stripe.com/9B65kweBCgNJ2Xb8TFgMw00",
        qrImage: "/ultimate.png",
        priceId: "price_1SmciJ5E116UcrqA95E7zJuD"
    }
];
