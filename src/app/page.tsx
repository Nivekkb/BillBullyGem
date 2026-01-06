import { Button } from "@/components/ui/button";
import { CreditCard, HandCoins, Scissors, Phone } from "lucide-react";
import Link from 'next/link';
import { Logo } from "@/components/icons/logo";

const stats = [
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
                className="absolute inset-0 top-0 grid grid-cols-2 -space-x-52 opacity-20"
            >
                <div className="h-60 bg-gradient-to-br from-primary to-green-400 blur-[100px] "></div>
                <div className="h-72 bg-gradient-to-r from-cyan-400 to-primary blur-[100px] "></div>
            </div>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Your Financial <span className="text-primary">Attack Dog</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              BillBully fights the battles you hate. Stop spending hours on hold. Let AI do the dirty work while you watch your savings grow.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <p className="text-4xl lg:text-5xl font-bold text-primary">{stat.value}</p>
                        <p className="mt-2 text-lg font-semibold">{stat.label}</p>
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                ))}
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
