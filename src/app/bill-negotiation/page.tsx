import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const bills = [
    { company: "Comcast/Xfinity", category: "Internet", currentBill: "$89.99", status: "Success", savings: "$35.00/mo" },
    { company: "AT&T Wireless", category: "Phone", currentBill: "$124.50", status: "Failed", savings: "$0.00" },
    { company: "Geico", category: "Insurance", currentBill: "$150.00", status: "Negotiating", savings: "..." },
    { company: "Verizon Fios", category: "Cable", currentBill: "$110.00", status: "Pending", savings: "..." },
];

export default function BillNegotiationPage() {
    const getBadgeVariant = (status: string) => {
        switch(status.toLowerCase()){
            case 'success':
                return 'default';
            case 'pending':
            case 'negotiating':
                return 'secondary';
            case 'failed':
                return 'destructive';
            default:
                return 'outline';
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Bill Negotiation</h1>
                <p className="text-muted-foreground">Let our AI agents fight for a lower price on your monthly bills.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Add a Bill for Negotiation</CardTitle>
                    <CardDescription>Enter the details of a bill you'd like us to negotiate.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" placeholder="e.g., Comcast" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bill-category">Category</Label>
                            <Select>
                                <SelectTrigger id="bill-category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="internet">Internet</SelectItem>
                                    <SelectItem value="cable">Cable TV</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                    <SelectItem value="insurance">Insurance</SelectItem>
                                    <SelectItem value="utilities">Utilities</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="current-bill">Current Monthly Bill ($)</Label>
                            <Input id="current-bill" type="number" placeholder="e.g., 89.99" />
                        </div>
                        <div className="md:col-span-3">
                             <Button>Submit for Negotiation</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Negotiations</CardTitle>
                    <CardDescription>Track the progress of your active and past negotiations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Current Bill</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Savings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bills.map((bill, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{bill.company}</TableCell>
                                    <TableCell>{bill.category}</TableCell>
                                    <TableCell>{bill.currentBill}</TableCell>
                                    <TableCell><Badge variant={getBadgeVariant(bill.status)}>{bill.status}</Badge></TableCell>
                                    <TableCell className="text-right font-medium">{bill.savings}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
