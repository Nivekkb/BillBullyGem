'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DisputeForm } from '../components/credit-repair/dispute-form';
import { AnalyzeResponseForm } from '../components/credit-repair/analyze-response-form';
import { ScoreTracker } from '../components/credit-repair/score-tracker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { CreditItem } from '@/lib/types';

export default function CreditRepairPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const creditItemsQuery = useMemoFirebase(
        () =>
        user && firestore
            ? collection(firestore, 'users', user.uid, 'credit_items')
            : null,
        [user, firestore]
    );

    const { data: creditItems, isLoading } = useCollection<CreditItem>(creditItemsQuery);
    
    const getBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'deleted':
            case 'updated':
            case 'verified':
                return 'default';
            case 'disputed':
            case 'identified':
                return 'secondary';
            default:
                return 'outline';
        }
    };

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
                                Found an error on your credit report? Let's generate a dispute letter and save it.
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
                            {isLoading ? (
                                <div className="flex justify-center items-center h-40">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : creditItems && creditItems.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Bureau</TableHead>
                                            <TableHead>Account Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Disputed On</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {creditItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.bureau}</TableCell>
                                                <TableCell className="font-medium">{item.accountName}</TableCell>
                                                <TableCell>{item.type.replace(/_/g, ' ')}</TableCell>
                                                <TableCell><Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge></TableCell>
                                                <TableCell className="text-right">{item.disputeDate ? new Date(item.disputeDate).toLocaleDateString() : 'N/A'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-muted-foreground">You haven't started any credit disputes yet.</p>
                                    <p className="text-sm text-muted-foreground">Add a dispute above to get started!</p>
                                </div>
                            )}
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