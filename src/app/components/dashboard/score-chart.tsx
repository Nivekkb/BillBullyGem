"use client"

import { useMemo } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { format, subMonths } from 'date-fns';
import type { CreditItem } from '@/lib/types';
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    score: {
      label: "Credit Score",
      color: "hsl(var(--chart-2))",
    },
}

type ScoreChartProps = {
    creditItems: CreditItem[] | null;
}

const BASE_SCORE = 650;
const POINTS_PER_DELETION = 15;

export function ScoreChart({ creditItems }: ScoreChartProps) {
  const { chartData, currentScore } = useMemo(() => {
    let score = BASE_SCORE;
    const history: { month: string, score: number }[] = [];

    // Initialize history for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = subMonths(new Date(), i);
      history.push({ month: format(d, 'MMMM'), score: 0 });
    }
    
    // Set initial score for the first month in our view
    history[0].score = BASE_SCORE;

    const sortedItems = creditItems 
      ? [...creditItems].sort((a,b) => new Date(a.createdAt.toDate()).getTime() - new Date(b.createdAt.toDate()).getTime())
      : [];

    sortedItems.forEach(item => {
        if (item.status === 'Deleted' && item.disputeDate) {
            const disputeMonth = format(new Date(item.disputeDate), 'MMMM');
            const itemPoints = POINTS_PER_DELETION; 
            score += itemPoints;
            
            let foundMonth = false;
            for(let i = 0; i < history.length; i++) {
                if(history[i].month === disputeMonth) {
                    foundMonth = true;
                }
                if (foundMonth) {
                    history[i].score += itemPoints;
                }
            }
        }
    });

    // Fill in scores for months with no activity
    for (let i = 1; i < history.length; i++) {
        if (history[i].score === 0 || history[i].score < history[i-1].score) {
            history[i].score = history[i-1].score;
        }
    }
    
    const finalScore = history[history.length - 1]?.score || BASE_SCORE;

    return { chartData: history, currentScore: finalScore };
  }, [creditItems]);

  const yDomain = useMemo(() => {
      const scores = chartData.map(d => d.score);
      const minScore = Math.min(...scores, BASE_SCORE);
      const maxScore = Math.max(...scores, BASE_SCORE);
      return [Math.max(0, Math.floor((minScore - 20) / 10) * 10), Math.ceil((maxScore + 20) / 10) * 10];
  }, [chartData]);


  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            domain={yDomain}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Line
            dataKey="score"
            type="monotone"
            stroke="var(--color-score)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
