import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
    description?: string;
    change?: string;
    changeColor?: string;
}

export function StatCard({ title, value, icon, description, change, changeColor }: StatCardProps) {
    return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">
                {change && <span className={cn("mr-1", changeColor)}>{change}</span>}
                {description}
            </p>
          </CardContent>
        </Card>
    );
}
