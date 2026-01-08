import { Button } from "@/components/ui/button";
import {
  CreditCard,
  HandCoins,
  Scissors,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Bot,
  MailCheck,
  AreaChart,
  Link as LinkIcon,
  Scan,
  Power,
  DollarSignIcon,
  Check,
  Lock,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/pricing";

const howItWorksSteps = [
  {
    number: "01",
    icon: <Edit className="h-8 w-8" />,
    title: "Enter Your Bills & Accounts",
    description:
      "Manually add your bills, subscriptions, and credit report items you want to address. Our guided forms make it easy.",
  },
  {
    number: "02",
    icon: <Scan className="h-8 w-8" />,
    title: "AI Analyzes & Prepares",
    description:
      "Our AI analyzes the info you provide and prepares powerful, personalized letters and negotiation scripts.",
  },
  {
    number: "03",
    icon: <MailCheck className="h-8 w-8" />,
    title: "We Help You Take Action Safely",
    description:
      "We provide the documents and guides. You send the letters and make the calls, armed with AI-powered arguments.",
  },
  {
    number: "04",
    icon: <DollarSignIcon className="h-8 w-8" />,
    title: "You Save Money",
    description:
      "Track your savings and credit score improvements in your dashboard. You are in full control.",
  },
];

const features = [
  {
    icon: <HandCoins className="h-8 w-8" />,
    title: "Save Money on Bills",
    description: "Get clear, practical guidance for lowering unfair or inflated bills.",
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Fix Unfair Credit Hits",
    description: "Document your disputes clearly and stay organized while you push back.",
  },
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Stop Paying for Things You Don’t Use",
    description: "Keep subscriptions from draining your budget and take back control.",
  },
];

const detailedFeatures = [
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: "AI-Powered Scripts",
    description: "AI helps generate personalized negotiation scripts based on your provider and goals.",
    stat: "Clear, practical guidance",
  },
  {
    icon: <MailCheck className="h-6 w-6 text-primary" />,
    title: "Guided Dispute Letters",
    description: "Generate organized, easy-to-follow dispute letters aligned with standard best practices.",
    stat: "Designed for clarity and confidence",
  },
  {
    icon: <AreaChart className="h-6 w-6 text-primary" />,
    title: "Document Logic",
    description: "Our AI helps you craft debt validation letters and goodwill requests to challenge collectors and creditors.",
    stat: "A real human checks important things when needed",
  },
];

const statsNew = [
  { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: "Built for fairness and transparency" },
  { icon: <TrendingUp className="h-5 w-5 text-primary" />, text: "Early launch — shipping carefully" },
  { icon: <Sparkles className="h-5 w-5 text-primary" />, text: "Human-first, anti‑predatory by design" },
];

const proofStats = [
  { value: "Early", label: "Launch Stage", sublabel: "features rolling out in phases" },
  { value: "Human‑First", label: "Built for People", sublabel: "not hype or shortcuts" },
  { value: "Transparent", label: "No Fake Metrics", sublabel: "trust over spin" },
  { value: "Careful", label: "Responsible Growth", sublabel: "quality over speed" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight font-headline">BillBully</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div aria-hidden="true" className="absolute inset-0 top-0 grid grid-cols-2 -space-x-52 opacity-40">
            <div className="h-60 bg-gradient-to-br from-primary to-green-400 blur-[200px]"></div>
            <div className="h-72 bg-gradient-to-r from-cyan-400 to-primary blur-[200px]"></div>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAiIHN0cm9rZT0iaHNsKDAsIDAlLCAxMDAlLCAwLjA1KSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-50"></div>
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 py-1 px-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Built for real people -- not finance bros.
            </Badge>
            <h1 className="mt-4 text-5xl md:text-7xl font-bold font-headline tracking-tighter">
              Stop Getting Ripped Off. Let AI Help You Push Back.
              <br />
              <span className="text-primary">Start Saving Smarter.</span>
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground">
              BillBully uses AI to help you negotiate bills, lower unfair charges, and dispute incorrect credit items. We guide
              you through every step—no bots, no hidden fees, just real savings.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Built by someone who’s been burned, got tired of it, and decided to fight back — carefully, honestly, and for
              regular people.
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">Start Saving Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
              <span className="text-sm text-muted-foreground">Start Free — Keep Your Savings</span>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI powered</span>
              </div>
              <p className="text-muted-foreground/80">Early access rollout. Features expand as we validate quality.</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm mb-10">
              {statsNew.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  {stat.icon}
                  <span className="text-muted-foreground">{stat.text}</span>
                </div>
              ))}
            </div>

            <div className="relative max-w-2xl mx-auto space-y-4 animate-fade-in-up">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Monthly Savings</p>
                    <p className="text-4xl font-bold text-primary">$237.48</p>
                  </div>
                  <Badge variant="default" className="bg-green-500/10 text-green-400 border-green-500/20">
                    +18% this month
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-left">
                  <div>
                    <p className="text-xs text-muted-foreground">Bills Negotiated</p>
                    <p className="text-2xl font-bold">7</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Credit Score</p>
                    <p className="text-2xl font-bold">+47 pts</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Subscriptions Cut</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                </div>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {proofStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-bold text-primary tracking-tighter">{stat.value}</p>
                  <p className="mt-2 font-semibold text-foreground">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-background/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-8 shadow-card">
                <h2 className="text-2xl md:text-3xl font-bold font-headline">Why This Exists</h2>
                <p className="mt-4 text-muted-foreground">
                  BillBully was not created by a bank, a VC firm, or a growth team. It was built by Kevin Boutilier — a
                  self‑taught builder who cares more about protecting people than impressing investors.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/60 p-8 shadow-card">
                <h3 className="text-2xl md:text-3xl font-bold font-headline">A Personal Promise</h3>
                <div className="mt-4 space-y-3 text-muted-foreground">
                  <p>I will not exaggerate results. I will not hide fees. I will not manipulate you. If something is not ready, I will tell you.</p>
                  <p>If something goes wrong, I will own it.</p>
                  <p>My job is to protect you, not profit from your confusion.</p>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">— Kevin</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-background/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              If bills, credit, and subscriptions feel stacked against you — BillBully helps you fight back safely and confidently.
            </h2>
            <p className="mt-3 text-2xl md:text-3xl font-bold font-headline tracking-tight">
              Your Financial <span className="text-primary">Toolkit</span>
            </p>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              We give you the tools and the intelligence. You stay in control and reap the rewards.
            </p>
          </div>

          <div className="container mx-auto px-4 md:px-6 mt-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-secondary mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detailedFeatures.map((feature, index) => (
              <Card key={index} className="bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-4">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {feature.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              How <span className="text-primary">BillBully</span> Works
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Four simple steps to financial fitness. No surprises, just results.
            </p>
          </div>
          <div className="container mx-auto px-4 md:px-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {howItWorksSteps.map((step) => (
                <Card key={step.number} className="bg-card/50 border border-border/50 p-6 relative">
                  <Badge variant="default" className="absolute -top-4 -left-4 h-10 w-10 text-base justify-center">
                    {step.number}
                  </Badge>
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-primary">
                      {step.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                <span className="font-bold text-foreground">Coming Soon:</span> Plaid integration for assisted bill detection and guided
                negotiation coaching.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You’re never doing this alone — we guide you step-by-step so nothing feels confusing or risky.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 md:py-32 bg-background/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">Simple, Transparent Pricing</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Start for free and upgrade when you're ready. No hidden fees, no long-term contracts.
            </p>
          </div>
          <div className="container mx-auto px-4 md:px-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={cn("flex flex-col", tier.popular && "border-primary ring-2 ring-primary shadow-lg")}>
                  {tier.popular && <Badge className="w-fit self-center -mt-3 bg-primary">Most Popular</Badge>}
                  <CardHeader className="pt-8">
                    <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                    {tier.emotionalBenefit && <p className="text-primary font-medium text-sm pt-2">{tier.emotionalBenefit}</p>}
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
                    <Button asChild size="lg" className="w-full mt-6" variant={tier.buttonVariant as any}>
                      <Link href={tier.buttonHref}>{tier.buttonText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>256-bit encryption</span>
              <span className="text-border"> • </span>
              <span>FCRA compliant</span>
              <span className="text-border"> • </span>
              <span>Cancel anytime</span>
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Your financial situation is personal. We treat it with respect.
            </p>
          </div>
        </section>
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Ready to Stop Getting <span className="text-primary">Ripped Off?</span>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">
              Early launch, built carefully. Start free — no credit card required.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">Start Saving Now &rarr;</Link>
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">Calm. Honest. Grounded. Built for people who are done being taken advantage of.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Logo className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold tracking-tight font-headline">BillBully</span>
              </Link>
              <p className="text-sm text-muted-foreground">Your AI co-pilot for financial fitness.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    FCRA Disclosures
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BillBully. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
