'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStatsGrid } from "../components/dashboard/dashboard-stats-grid";
import { SavingsChart } from "../components/dashboard/savings-chart";
import { ScoreChart } from "../components/dashboard/score-chart";
import { RecentActivity } from "../components/dashboard/recent-activity";
import { AiChatPanel } from "../components/dashboard/ai-chat-panel";
import { Loader2 } from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { CreditItem, Subscription, Bill, ComplianceCheck } from '@/lib/types';
import { useDashboardStats } from '@/hooks/use-dashboard-stats';


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

  const stats = useDashboardStats(bills, creditItems, subscriptions);

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
      <div className="lg:hidden space-y-8">
        <AiChatPanel
          bills={bills}
          creditItems={creditItems}
          subscriptions={subscriptions}
          complianceChecks={complianceChecks}
          className="h-[520px] mb-6"
        />

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Your Financial Snapshot
          </h2>
        </div>

        <DashboardStatsGrid stats={stats} />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Credit Score Journey</CardTitle>
              <CardDescription>Your score improvements over time.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ScoreChart creditItems={creditItems} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Monthly Savings</CardTitle>
              <CardDescription>Your bill negotiation savings over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SavingsChart bills={bills} subscriptions={subscriptions} />
            </CardContent>
          </Card>

          <RecentActivity
            headerClassName="py-3"
            contentClassName="pt-0"
          />
        </div>
      </div>

      <div className="hidden lg:block space-y-8">
        <DashboardStatsGrid stats={stats} />

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

          <Card className="mt-10 md:mt-0 lg:col-span-4 lg:row-start-2">
            <CardHeader>
              <CardTitle className="font-headline">Credit Score Journey</CardTitle>
              <CardDescription>Your score improvements over time.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ScoreChart creditItems={creditItems} />
            </CardContent>
          </Card>

          <RecentActivity
            className="mt-10 md:mt-0 lg:col-span-3 lg:row-start-2 lg:h-full lg:min-h-[300px]"
            headerClassName="py-3"
            contentClassName="pt-0"
          />
        </div>
      </div>
    </div>
  );
}
