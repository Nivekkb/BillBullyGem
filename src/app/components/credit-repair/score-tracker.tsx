import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreChart } from "../dashboard/score-chart";
import type { CreditItem } from "@/lib/types";
import { subMonths } from "date-fns";

type ScoreTrackerProps = {
    creditItems: CreditItem[] | null;
}

const BASE_SCORE = 650;
const POINTS_PER_DELETION = 15;

export function ScoreTracker({ creditItems }: ScoreTrackerProps) {
    const { currentScore, scoreChange } = useMemo(() => {
        if (!creditItems) return { currentScore: BASE_SCORE, scoreChange: 0 };

        const deletedItems = creditItems.filter(item => item.status === 'Deleted');
        const currentScore = BASE_SCORE + deletedItems.length * POINTS_PER_DELETION;

        const oneMonthAgo = subMonths(new Date(), 1);
        const deletedLastMonth = deletedItems.filter(item => item.disputeDate && new Date(item.disputeDate) > oneMonthAgo).length;
        const scoreChange = deletedLastMonth * POINTS_PER_DELETION;

        return { currentScore, scoreChange };
    }, [creditItems]);


    return (
        <div className="space-y-6">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-lg text-muted-foreground font-medium">Your Current Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-7xl font-bold font-headline text-primary">{currentScore}</p>
                    {scoreChange > 0 && <p className="text-lg text-green-500 font-semibold mt-2">+{scoreChange} points</p>}
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
                    <ScoreChart creditItems={creditItems} />
                </CardContent>
            </Card>
        </div>
    );
}
