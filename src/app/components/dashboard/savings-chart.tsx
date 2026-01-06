"use client"

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { format, subMonths, getMonth, getYear } from 'date-fns';

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Subscription } from "@/lib/types";

type Bill = {
  id: string;
  companyName: string;
  status: string;
  createdAt: { toDate: () => Date };
  savingsAmount?: number;
};

const chartConfig = {
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))",
  },
}

type SavingsChartProps = {
    bills: Bill[] | null;
    subscriptions: Subscription[] | null;
}

export function SavingsChart({ bills, subscriptions }: SavingsChartProps) {

  const chartData = useMemo(() => {
    const sixMonthsAgo = subMonths(new Date(), 5);
    const monthlySavings: { [key: string]: number } = {};

    // Initialize the last 6 months
    for (let i = 0; i < 6; i++) {
        const date = subMonths(new Date(), i);
        const monthKey = format(date, 'yyyy-MM');
        monthlySavings[monthKey] = 0;
    }

    bills?.forEach(bill => {
        if (bill.savingsAmount && bill.status === 'Success' && bill.createdAt.toDate() >= sixMonthsAgo) {
            const monthKey = format(bill.createdAt.toDate(), 'yyyy-MM');
            if(monthlySavings.hasOwnProperty(monthKey)) {
                monthlySavings[monthKey] += bill.savingsAmount;
            }
        }
    });

    subscriptions?.forEach(sub => {
        if (sub.status === 'Canceled' && sub.cancellationDate && new Date(sub.cancellationDate) >= sixMonthsAgo) {
            const monthKey = format(new Date(sub.cancellationDate), 'yyyy-MM');
            let monthlyValue = sub.amount;
            if (sub.billingFrequency === 'annually') monthlyValue /= 12;
            if (sub.billingFrequency === 'quarterly') monthlyValue /= 3;
            
            if(monthlySavings.hasOwnProperty(monthKey)) {
                monthlySavings[monthKey] += monthlyValue;
            }
        }
    });

    return Object.entries(monthlySavings)
        .map(([key, savings]) => ({
            month: format(new Date(`${key}-01T12:00:00`), 'MMMM'),
            savings: savings,
        }))
        .sort((a, b) => new Date(a.month + ' 1, 2023').getMonth() - new Date(b.month + ' 1, 2023').getMonth()); // A bit hacky but works for month name sorting
  }, [bills, subscriptions]);


  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value}`}
          />
           <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
