import { StatCard } from "../components/dashboard/stat-card";
import { SavingsChart } from "../components/dashboard/savings-chart";
import { ScoreChart } from "../components/dashboard/score-chart";
import { RecentActivity } from "../components/dashboard/recent-activity";
import { DollarSign, HeartPulse, ShieldCheck, User } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's a summary of your financial health.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Savings"
          value="$1,284.50"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          change="+12.5%"
          changeColor="text-green-500"
          description="since last month"
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
          value="3"
          icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
          change="+1"
          changeColor="text-amber-500"
          description="awaiting response"
        />
        <StatCard 
          title="Canceled Subs"
          value="4"
          icon={<User className="h-4 w-4 text-muted-foreground" />}
          change="-$47/mo"
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
