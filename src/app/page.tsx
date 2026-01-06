import { Button } from "@/components/ui/button";
import { CreditCard, HandCoins, Scissors, Phone, ShieldCheck, TrendingUp, Sparkles, Bot, MailCheck, AreaChart, Link as LinkIcon, Scan, Power, DollarSignIcon, Check, Lock, Star } from "lucide-react";
import Link from 'next/link';
import { Logo } from "@/components/icons/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const howItWorksSteps = [
    {
        number: "01",
        icon: <LinkIcon className="h-8 w-8" />,
        title: "Connect Your Accounts",
        description: "Securely link your bank accounts using Plaid. We scan for recurring charges and credit report access."
    },
    {
        number: "02",
        icon: <Scan className="h-8 w-8" />,
        title: "AI Analyzes Everything",
        description: "Our AI identifies overpriced bills, disputable credit items, and forgotten subscriptions in seconds."
    },
    {
        number: "03",
        icon: <Power className="h-8 w-8" />,
        title: "We Fight For You",
        description: "AI negotiates your bills, sends certified dispute letters, and cancels unwanted subscriptions automatically."
    },
    {
        number: "04",
        icon: <DollarSignIcon className="h-8 w-8" />,
        title: "You Save Money",
        description: "Track your savings in real-time. Average user saves $2,840/year without lifting a finger."
    }
];

const features = [
  { icon: <HandCoins className="h-8 w-8" />, title: "Bill Negotiation", description: "Our AI agents negotiate your monthly bills like internet, cable, and phone." },
  { icon: <CreditCard className="h-8 w-8" />, title: "Credit Repair", description: "We find and dispute errors on your credit report to boost your score." },
  { icon: <Scissors className="h-8 w-8" />, title: "Subscription Cancellation", description: "Tired of unwanted subscriptions? We'll cancel them for you." },
];

const detailedFeatures = [
    { 
        icon: <Bot className="h-6 w-6 text-primary" />, 
        title: "AI-Powered Scripts", 
        description: "GPT-4 generates personalized negotiation scripts based on your payment history and competitor rates.", 
        stat: "95% success on cable" 
    },
    { 
        icon: <MailCheck className="h-6 w-6 text-primary" />, 
        title: "Certified Mail Automation", 
        description: "Dispute letters automatically printed and mailed via certified mail to all three credit bureaus.", 
        stat: "48hr turnaround" 
    },
    { 
        icon: <AreaChart className="h-6 w-6 text-primary" />, 
        title: "Debt Validation", 
        description: "Challenges collection agencies to prove they own your debt. No proof = deletion from your report.", 
        stat: "30% of debts invalid" 
    },
];

const statsNew = [
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: "Bank-Level Security" },
    { icon: <TrendingUp className="h-5 w-5 text-primary" />, text: "$4.2M+ Saved for Users" },
    { icon: <Sparkles className="h-5 w-5 text-primary" />, text: "12,000+ Credit Items Removed" },
];

const pricingTiers = [
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
        popular: false
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
        popular: false
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
        popular: true
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
        popular: false
    }
]

const proofStats = [
    { value: "$4.2M+", label: "Saved for Users", sublabel: "and counting" },
    { value: "12,847", label: "Credit Items Removed", sublabel: "in the last 12 months" },
    { value: "94%", label: "Negotiation Success", sublabel: "on cable & internet" },
    { value: "47 pts", label: "Avg. Score Increase", sublabel: "within 6 months" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight font-headline">
              BillBully
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
             <div
                aria-hidden="true"
                className="absolute inset-0 top-0 grid grid-cols-2 -space-x-52 opacity-40"
            >
                <div className="h-60 bg-gradient-to-br from-primary to-green-400 blur-[200px] "></div>
                <div className="h-72 bg-gradient-to-r from-cyan-400 to-primary blur-[200px] "></div>
            </div>
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAiIHN0cm9rZT0iaHNsKDAsIDAlLCAxMDAlLCAwLjA1KSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-50"></div>
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 py-1 px-4">
                <Sparkles className="h-4 w-4 mr-2"/>
                AI-Powered Financial Advocacy
            </Badge>
            <h1 className="mt-4 text-5xl md:text-7xl font-bold font-headline tracking-tighter">
                Stop Overpaying. <br/>
                <span className="text-primary">Start Fighting Back.</span>
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground">
              BillBully uses AI to negotiate your bills, repair your credit, and cancel subscriptions you forgot about. <span className="font-bold text-foreground">Average savings: $2,840/year.</span>
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                    <Link href="/dashboard">Start Saving Free</Link>
                </Button>
                <Button size="lg" variant="outline">See How It Works</Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm mb-16">
                    {statsNew.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {stat.icon}
                            <span className="text-muted-foreground">{stat.text}</span>
                        </div>
                    ))}
                </div>

                <Card className="relative max-w-2xl mx-auto bg-card/60 backdrop-blur-sm animate-fade-in-up">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Monthly Savings</p>
                                <p className="text-4xl font-bold text-primary">$237.48</p>
                            </div>
                            <Badge variant="default" className="bg-green-500/10 text-green-400 border-green-500/20">+18% this month</Badge>
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
                    </CardContent>
                </Card>

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


        <section id="features" className="py-20 md:py-32 bg-background/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Your Financial <span className="text-primary">Attack Dog</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              BillBully fights the battles you hate. Stop spending hours on hold. Let AI do the dirty work while you watch your savings grow.
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
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{feature.stat}</Badge>
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
                Four simple steps to financial freedom. No phone calls, no paperwork, no stress.
                </p>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {howItWorksSteps.map((step) => (
                        <Card key={step.number} className="bg-card/50 border border-border/50 p-6 relative">
                            <Badge variant="default" className="absolute -top-4 -left-4 h-10 w-10 text-base justify-center">{step.number}</Badge>
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
            </div>
        </section>

        <section id="pricing" className="py-20 md:py-32 bg-background/50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
                    Flexible Pricing for <span className="text-primary">Every Goal</span>
                </h2>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                    Start free and upgrade anytime. No hidden fees, no long-term contracts. Just savings.
                </p>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pricingTiers.map((tier) => (
                        <Card key={tier.name} className={cn("flex flex-col", tier.popular && "border-primary ring-2 ring-primary shadow-lg")}>
                            {tier.popular && (
                                <Badge className="w-fit self-center -mt-3 bg-primary">Most Popular</Badge>
                            )}
                            <CardHeader className="pt-8">
                                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                                <p>
                                    <span className="text-5xl font-bold">{tier.price}</span>
                                    <span className="text-muted-foreground">{tier.period}</span>
                                </p>
                                <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 space-y-4">
                               <ul className="space-y-3 flex-1">
                                   {tier.features.map(feature => (
                                       <li key={feature} className="flex items-start">
                                           <Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" />
                                           <span className="text-muted-foreground">{feature}</span>
                                       </li>
                                   ))}
                               </ul>
                               <Button size="lg" className="w-full mt-6" variant={tier.buttonVariant as any}>
                                   {tier.buttonText}
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
            </div>
        </section>
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
                    Ready to Stop Getting <span className="text-primary">Ripped Off?</span>
                </h2>
                <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">
                    Join 25,000+ users who've saved an average of $2,840/year. Start free—no credit card required.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/dashboard">Start Saving Now &rarr;</Link>
                    </Button>
                    <Button size="lg" variant="outline">
                        Schedule a Demo
                    </Button>
                </div>
                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Trusted by users across the US & Canada</p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center text-primary">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <p className="font-semibold">4.9/5 <span className="font-normal text-muted-foreground">(2,847 reviews)</span></p>
                    </div>
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
                        <span className="text-xl font-bold tracking-tight font-headline">
                        BillBully
                        </span>
                    </Link>
                    <p className="text-sm text-muted-foreground">AI-powered financial advocacy for Americans and Canadians who refuse to overpay.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-foreground">Product</h4>
                    <ul className="space-y-3">
                        <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                        <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                        <li><Link href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">API</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">About</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Press</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">FCRA Disclosures</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Security</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4 text-foreground">Support</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Status</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} BillBully. All rights reserved.</p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
