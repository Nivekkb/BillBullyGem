"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const subscriptions = [
    { name: "Netflix", status: "Canceled", amount: "$15.49/mo" },
    { name: "Spotify", status: "Active", amount: "$10.99/mo" },
    { name: "Adobe Creative Cloud", status: "Active", amount: "$54.99/mo" },
    { name: "Disney+", status: "Canceled", amount: "$13.99/mo" },
    { name: "Amazon Prime", status: "Active", amount: "$14.99/mo" },
];

export default function SubscriptionCancellationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Subscription Manager</h1>
                <p className="text-muted-foreground">Tired of paying for services you don't use? We'll cancel them for you.</p>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Cancel a Subscription</CardTitle>
                    <CardDescription>Fill out the details below and we'll handle the cancellation request.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="sub-name">Subscription Name</Label>
                                <Input id="sub-name" placeholder="e.g., Netflix, Spotify" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sub-reason">Reason for Cancellation</Label>
                                <Input id="sub-reason" placeholder="e.g., Too expensive, no longer needed" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="sub-details">Additional Details (Optional)</Label>
                            <Textarea id="sub-details" placeholder="e.g., Account email is user@example.com" />
                        </div>
                        <Button>Generate Cancellation Request</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Subscriptions</CardTitle>
                    <CardDescription>A list of your detected recurring subscriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((sub, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{sub.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={sub.status === 'Active' ? 'secondary' : 'default'}>{sub.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{sub.amount}</TableCell>
                                    <TableCell className="text-right">
                                        {sub.status === 'Active' && <Button variant="ghost" size="sm">Cancel</Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
