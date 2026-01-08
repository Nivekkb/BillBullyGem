import React from "react";
import { StatCard } from "./stat-card";
import { DollarSign, HeartPulse, ShieldCheck, User } from "lucide-react";

interface DashboardStats {
  totalSavings: number;
  activeDisputes: number;
  canceledSubs: number;
  canceledSubsMonthlySavings: number;
  currentScore: number;
  scoreChange: number;
}

interface DashboardStatsGridProps {
  stats: DashboardStats;
}

export const DashboardStatsGrid = React.memo(function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  return (
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
  );
});
