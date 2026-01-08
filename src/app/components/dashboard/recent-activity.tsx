'use client';

import { useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { CreditItem } from '@/lib/types';
import type { Subscription } from '@/lib/types';
// A type for the bill data could be added to types.ts as well
type Bill = {
  id: string;
  companyName: string;
  status: string;
  createdAt: { toDate: () => Date };
  savingsAmount?: number;
};

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type MergedActivity = {
  id: string;
  type: 'Credit Dispute' | 'Bill Negotiation' | 'Subscription';
  description: string;
  status: string;
  date: Date;
  amount: string;
};

type RecentActivityProps = {
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
};

export function RecentActivity({ className, contentClassName, headerClassName }: RecentActivityProps) {
  const { user } = useUser();
  const firestore = useFirestore();

  const baseQuery = (path: string) =>
    user && firestore
      ? query(collection(firestore, 'users', user.uid, path), orderBy('createdAt', 'desc'), limit(5))
      : null;

  const billsQuery = useMemoFirebase(() => baseQuery('bills'), [user, firestore]);
  const creditItemsQuery = useMemoFirebase(() => baseQuery('credit_items'), [user, firestore]);
  const subscriptionsQuery = useMemoFirebase(() => baseQuery('subscriptions'), [user, firestore]);

  const { data: bills, isLoading: loadingBills } = useCollection<Bill>(billsQuery);
  const { data: creditItems, isLoading: loadingCreditItems } = useCollection<CreditItem>(creditItemsQuery);
  const { data: subscriptions, isLoading: loadingSubscriptions } = useCollection<Subscription>(subscriptionsQuery);

  const activities = useMemo(() => {
    const allActivities: MergedActivity[] = [];

    bills?.forEach(bill => {
      allActivities.push({
        id: bill.id,
        type: 'Bill Negotiation',
        description: `Negotiated with ${bill.companyName}`,
        status: bill.status,
        date: bill.createdAt.toDate(),
        amount: bill.savingsAmount ? `-$${bill.savingsAmount.toFixed(2)}/mo` : (bill.status === 'Success' ? '$0.00' : ''),
      });
    });

    creditItems?.forEach(item => {
      allActivities.push({
        id: item.id,
        type: 'Credit Dispute',
        description: `Disputed ${item.type.replace(/_/g, ' ')} with ${item.bureau}`,
        status: item.status,
        date: item.createdAt.toDate(),
        amount: item.status === 'Deleted' ? '+ pts' : '',
      });
    });

    subscriptions?.forEach(sub => {
      allActivities.push({
        id: sub.id,
        type: 'Subscription',
        description: `${sub.status === 'Canceled' ? 'Canceled' : 'Added'} ${sub.serviceName}`,
        status: sub.status,
        date: sub.createdAt.toDate(),
        amount: sub.status === 'Canceled' ? `-$${sub.amount.toFixed(2)}/mo` : '',
      });
    });

    return allActivities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 7); // Get latest 7 activities
  }, [bills, creditItems, subscriptions]);

  const isLoading = loadingBills || loadingCreditItems || loadingSubscriptions;

  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
      case 'canceled':
      case 'deleted':
        return 'default';
      case 'pending':
      case 'negotiating':
      case 'disputed':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className={cn('space-y-1', headerClassName)}>
        <CardTitle className="font-headline">Recent Activity</CardTitle>
        <CardDescription>A log of all recent actions taken on your behalf.</CardDescription>
      </CardHeader>
      <CardContent className={cn('flex-1 overflow-y-auto', contentClassName)}>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : activities.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map(activity => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.type}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(activity.status)}>{activity.status}</Badge>
                  </TableCell>
                  <TableCell>{activity.date.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium">{activity.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No recent activity to display.</p>
            <p className="text-sm text-muted-foreground">Start by adding a bill or disputing an item.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
