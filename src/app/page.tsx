import { Button } from "@/components/ui/button";
import { CreditCard, HandCoins, Scissors, Phone, ShieldCheck, TrendingUp, Sparkles, Bot, MailCheck, AreaChart } from "lucide-react";
import Link from 'next/link';
import { Logo } from "@/components/icons/logo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statsOld = [
  { value: "$4.2M+", label: "Saved for Users", description: "and counting" },
  { value: "12,847", label: "Credit Items Removed", description: "in the last 12 months" },
  { value: "94%", label: "Negotiation Success", description: "on cable & internet" },
  { value: "47 pts", label: "Avg. Score Increase", description: "within 6 months" },
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
            <Link href="#" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-primary transition-colors">How It Works</Link>
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

            <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm">
                {statsNew.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {stat.icon}
                        <span className="text-muted-foreground">{stat.text}</span>
                    </div>
                ))}
            </div>

             <Card className="relative mt-20 max-w-sm mx-auto bg-card/60 backdrop-blur-sm animate-fade-in-up">
                <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Monthly Savings</p>
                            <p className="text-4xl font-bold text-primary">$237.48</p>
                        </div>
                        <Badge variant="default" className="bg-green-500/10 text-green-400 border-green-500/20">+18% this month</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <p className="text-xs text-muted-foreground">Bills Negotiated</p>
                            <p className="text-xl font-bold">7</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Credit Score</p>
                            <p className="text-xl font-bold">+47 pts</p>
                        </div>
                         <div>
                            <p className="text-xs text-muted-foreground">Subscriptions Cut</p>
                            <p className="text-xl font-bold">4</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
        </section>

        <section className="py-20 md:py-32 bg-background/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Your Financial <span className="text-primary">Attack Dog</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              BillBully fights the battles you hate. Stop spending hours on hold. Let AI do the dirty work while you watch your savings grow.
            </p>
          </div>
        </section>
        
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
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

        <section className="container mx-auto px-4 md:px-6 pb-20 md:pb-32">
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
            <div className="mt-20 text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
                How <span className="text-primary">BillBully</span> Works
                </h2>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Four simple steps to financial freedom. No phone calls, no paperwork, no stress.
                </p>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statsOld.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <p className="text-4xl lg:text-5xl font-bold text-primary">{stat.value}</p>
                        <p className="mt-2 text-lg font-semibold">{stat.label}</p>
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4 md:px-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BillBully. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
