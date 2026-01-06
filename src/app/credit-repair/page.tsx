import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DisputeForm } from "../components/credit-repair/dispute-form";
import { AnalyzeResponseForm } from "../components/credit-repair/analyze-response-form";
import { ScoreTracker } from "../components/credit-repair/score-tracker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const disputeHistory = [
    { bureau: "Equifax", item: "Late Payment (Citi)", date: "2024-06-15", status: "Deleted", outcome: "+25 pts" },
    { bureau: "TransUnion", item: "Collection (Midland)", date: "2024-06-05", status: "Disputed", outcome: "Pending" },
    { bureau: "Equifax", item: "Incorrect Balance (Chase)", date: "2024-05-20", status: "Updated", outcome: "Corrected" },
];

export default function CreditRepairPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Credit Repair</h1>
                <p className="text-muted-foreground">Manage disputes, track your score, and take control of your credit.</p>
            </div>

            <Tabs defaultValue="disputes">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="disputes">Disputes</TabsTrigger>
                    <TabsTrigger value="analysis">Analyze Response</TabsTrigger>
                    <TabsTrigger value="tracker">Score Tracker</TabsTrigger>
                </TabsList>

                <TabsContent value="disputes" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Start a New Dispute</CardTitle>
                            <CardDescription>
                                Found an error on your credit report? Let's generate a dispute letter.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DisputeForm />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Dispute History</CardTitle>
                            <CardDescription>
                                Track all the disputes we've sent on your behalf.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Bureau</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Date Sent</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Outcome</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {disputeHistory.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.bureau}</TableCell>
                                            <TableCell className="font-medium">{item.item}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell><Badge variant={item.status === 'Deleted' || item.status === 'Updated' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                                            <TableCell className="text-right">{item.outcome}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analysis" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Analyze Credit Bureau Response</CardTitle>
                            <CardDescription>
                                Received a letter back from a credit bureau? Upload it here for our AI to analyze the outcome and suggest next steps.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AnalyzeResponseForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="tracker" className="mt-6">
                    <ScoreTracker />
                </TabsContent>
            </Tabs>
        </div>
    );
}
