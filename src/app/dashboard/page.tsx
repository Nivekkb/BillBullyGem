'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "../components/dashboard/stat-card";
import { SavingsChart } from "../components/dashboard/savings-chart";
import { ScoreChart } from "../components/dashboard/score-chart";
import { RecentActivity } from "../components/dashboard/recent-activity";
import { AiChatPanel } from "../components/dashboard/ai-chat-panel";
import { DollarSign, HeartPulse, ShieldCheck, User, Loader2 } from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { CreditItem, Subscription } from '@/lib/types';
import { subMonths, format } from 'date-fns';

// A type for the bill data could be added to types.ts as well
type Bill = {
  id: string;
  companyName: string;
  status: string;
  createdAt: { toDate: () => Date };
  savingsAmount?: number;
};

type ComplianceCheck = {
  id: string;
  featureDescription?: string;
  relevantLaws?: string;
  result?: {
    isCompliant?: boolean;
    complianceRationale?: string;
    suggestedAdjustments?: string;
  };
  createdAt?: { toDate?: () => Date } | string;
};


export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const billsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'bills') : null, [user, firestore]);
  const creditItemsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'credit_items') : null, [user, firestore]);
  const subscriptionsQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'subscriptions') : null, [user, firestore]);
  const complianceQuery = useMemoFirebase(() => user && firestore ? collection(firestore, 'users', user.uid, 'compliance_checks') : null, [user, firestore]);

  const { data: bills, isLoading: loadingBills } = useCollection<Bill>(billsQuery);
  const { data: creditItems, isLoading: loadingCreditItems } = useCollection<CreditItem>(creditItemsQuery);
  const { data: subscriptions, isLoading: loadingSubscriptions } = useCollection<Subscription>(subscriptionsQuery);
  const { data: complianceChecks, isLoading: loadingCompliance } = useCollection<ComplianceCheck>(complianceQuery);

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
    
    let score = 650; // Base Score
    const pointsPerDeletion = 15;
    const deletedItems = creditItems?.filter(item => item.status === 'Deleted').length || 0;
    score += deletedItems * pointsPerDeletion;
    
    const oneMonthAgo = subMonths(new Date(), 1);
    const deletedLastMonth = creditItems?.filter(item => item.status === 'Deleted' && item.disputeDate && new Date(item.disputeDate) > oneMonthAgo).length || 0;
    const scoreChange = deletedLastMonth * pointsPerDeletion;


    return {
      totalSavings,
      activeDisputes,
      canceledSubs,
      canceledSubsMonthlySavings: subSavings,
      currentScore: score,
      scoreChange: scoreChange
    };
  }, [bills, creditItems, subscriptions]);

  const isLoading = loadingBills || loadingCreditItems || loadingSubscriptions || loadingCompliance;

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
          value={String(stats.currentScore)}
          icon={<HeartPulse className="h-4 w-4 text-muted-foreground" />}
          change={stats.scoreChange > 0 ? `+${stats.scoreChange} pts` : ''}
          changeColor="text-green-500"
          description={stats.scoreChange > 0 ? "this month" : "since last dispute"}
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 lg:grid-rows-2">
        <Card className="lg:col-span-4 lg:row-start-1">
          <CardHeader>
            <CardTitle className="font-headline">Monthly Savings</CardTitle>
            <CardDescription>Your bill negotiation savings over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SavingsChart bills={bills} subscriptions={subscriptions} />
          </CardContent>
        </Card>

        <AiChatPanel
          bills={bills}
          creditItems={creditItems}
          subscriptions={subscriptions}
          complianceChecks={complianceChecks}
          className="lg:col-span-3 lg:row-start-1 lg:h-[520px]"
        />

        <Card className="mt-6 md:mt-0 lg:col-span-4 lg:row-start-2">
          <CardHeader>
            <CardTitle className="font-headline">Credit Score Journey</CardTitle>
            <CardDescription>Your score improvements over time.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ScoreChart creditItems={creditItems} />
          </CardContent>
        </Card>

        <RecentActivity
          className="mt-6 md:mt-0 lg:col-span-3 lg:row-start-2 lg:h-full lg:min-h-[300px]"
          headerClassName="py-3"
          contentClassName="pt-0"
        />
      </div>
    </div>
  );
}
