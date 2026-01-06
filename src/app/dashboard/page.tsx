'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "../components/dashboard/stat-card";
import { SavingsChart } from "../components/dashboard/savings-chart";
import { ScoreChart } from "../components/dashboard/score-chart";
import { RecentActivity } from "../components/dashboard/recent-activity";
import { DollarSign, HeartPulse, ShieldCheck, User, Loader2 } from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { CreditItem, Subscription } from '@/lib/types';

// A type for the bill data could be added to types.ts as well
type Bill = {
  id: string;
  companyName: string;
  status: string;
  createdAt: { toDate: () => Date };
  savingsAmount?: number;
};


export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const billsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'bills') : null, [user, firestore]);
  const creditItemsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'credit_items') : null, [user, firestore]);
  const subscriptionsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'subscriptions') : null, [user, firestore]);

  const { data: bills, isLoading: loadingBills } = useCollection<Bill>(billsQuery);
  const { data: creditItems, isLoading: loadingCreditItems } = useCollection<CreditItem>(creditItemsQuery);
  const { data: subscriptions, isLoading: loadingSubscriptions } = useCollection<Subscription>(subscriptionsQuery);

  const stats = useMemo(() => {
    const billSavings = bills?.reduce((acc, bill) => acc + (bill.savingsAmount || 0), 0) || 0;
    const subSavings = subscriptions?.filter(s => s.status === 'Canceled').reduce((acc, sub) => {
        if (sub.billingFrequency === 'annually') {
            return acc + sub.amount / 12;
        }
        if (sub.billingFrequency === 'quarterly') {
            return acc + sub.amount / 3;
        }
        return acc + sub.amount;
    }, 0) || 0;

    const totalSavings = billSavings + subSavings;
    const activeDisputes = creditItems?.filter(item => item.status === 'Disputed').length || 0;
    const canceledSubs = subscriptions?.filter(s => s.status === 'Canceled').length || 0;

    return {
      totalSavings,
      activeDisputes,
      canceledSubs,
      canceledSubsMonthlySavings: subSavings,
    };
  }, [bills, creditItems, subscriptions]);

  const isLoading = loadingBills || loadingCreditItems || loadingSubscriptions;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's a summary of your financial health.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Monthly Savings"
          value={`$${stats.totalSavings.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="from bills & subs"
        />
        <StatCard 
          title="Credit Score"
          value="721"
          icon={<HeartPulse className="h-4 w-4 text-muted-foreground" />}
          change="+43 pts"
          changeColor="text-green-500"
          description="since last dispute"
        />
        <StatCard 
          title="Active Disputes"
          value={String(stats.activeDisputes)}
          icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
          description="awaiting response"
        />
        <StatCard 
          title="Canceled Subs"
          value={String(stats.canceledSubs)}
          icon={<User className="h-4 w-4 text-muted-foreground" />}
          change={`-$${stats.canceledSubsMonthlySavings.toFixed(2)}/mo`}
          changeColor="text-green-500"
          description="savings this month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Monthly Savings</CardTitle>
            <CardDescription>Your bill negotiation savings over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SavingsChart />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Credit Score Journey</CardTitle>
            <CardDescription>Your score improvements over time.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ScoreChart />
          </CardContent>
        </Card>
      </div>

      <RecentActivity />
    </div>
  );
}
