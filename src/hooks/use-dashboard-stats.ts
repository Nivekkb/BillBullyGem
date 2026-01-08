import { useMemo } from 'react';
import { subMonths } from 'date-fns';
import type { Bill, CreditItem, Subscription } from '@/lib/types';

interface DashboardStats {
  totalSavings: number;
  activeDisputes: number;
  canceledSubs: number;
  canceledSubsMonthlySavings: number;
  currentScore: number;
  scoreChange: number;
}

export function useDashboardStats(
  bills: Bill[] | null,
  creditItems: CreditItem[] | null,
  subscriptions: Subscription[] | null
): DashboardStats {
  return useMemo(() => {
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
    const deletedLastMonth = creditItems?.filter(item =>
      item.status === 'Deleted' &&
      item.disputeDate &&
      new Date(item.disputeDate) > oneMonthAgo
    ).length || 0;
    const scoreChange = deletedLastMonth * pointsPerDeletion;

    return {
      totalSavings,
      activeDisputes,
      canceledSubs,
      canceledSubsMonthlySavings: subSavings,
      currentScore: score,
      scoreChange
    };
  }, [bills, creditItems, subscriptions]);
}