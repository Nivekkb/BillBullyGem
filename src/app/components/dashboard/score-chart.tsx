"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", score: 620 },
    { month: "February", score: 645 },
    { month: "March", score: 650 },
    { month: "April", score: 680 },
    { month: "May", score: 705 },
    { month: "June", score: 721 },
]

const chartConfig = {
    score: {
      label: "Credit Score",
      color: "hsl(var(--chart-2))",
    },
}

export function ScoreChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            domain={[600, 800]}
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
