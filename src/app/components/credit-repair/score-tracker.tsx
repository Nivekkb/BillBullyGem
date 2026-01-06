import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreChart } from "../dashboard/score-chart";

export function ScoreTracker() {
    return (
        <div className="space-y-6">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-lg text-muted-foreground font-medium">Your Current Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-7xl font-bold font-headline text-primary">721</p>
                    <p className="text-lg text-green-500 font-semibold mt-2">+43 points</p>
                    <p className="text-sm text-muted-foreground">since last month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Score History</CardTitle>
                    <CardDescription>
                        Track your credit score improvements over the past six months.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ScoreChart />
                </CardContent>
            </Card>
        </div>
    );
}
