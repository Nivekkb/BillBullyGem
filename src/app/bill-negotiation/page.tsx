'use client';

import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
} from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const billSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name is required.' }),
  category: z.string({ required_error: 'Please select a category.' }),
  currentAmount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive({ message: 'Amount must be positive.' })
  ),
});

export default function BillNegotiationPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const billsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'bills')
        : null,
    [user, firestore]
  );

  const { data: bills, isLoading } = useCollection(billsQuery);

  const form = useForm<z.infer<typeof billSchema>>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      companyName: '',
      currentAmount: 0,
    },
  });

  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
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
  };

  async function onSubmit(values: z.infer<typeof billSchema>) {
    if (!user || !firestore) return;

    const newBill = {
      userId: user.uid,
      ...values,
      status: 'Pending',
      createdAt: serverTimestamp(),
    };
    
    const billsCollection = collection(firestore, 'users', user.uid, 'bills');
    
    addDocumentNonBlocking(billsCollection, newBill);
    
    toast({
        title: "Bill Submitted!",
        description: `${values.companyName} bill has been submitted for coaching.`,
    });

    form.reset();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Bill Negotiation
        </h1>
        <p className="text-muted-foreground">
          Get AI coaching and scripts to help you negotiate a lower price on your monthly bills.
        </p>
        <p className="text-sm text-muted-foreground">
          Submitting here only saves your details. You can also just ask the AI coach in chat instead.
        </p>
      </div>
      <Button variant="link" onClick={() => router.back()} className="text-primary pl-0">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Add a Bill for Coaching</CardTitle>
          <CardDescription>
            Enter the details of a bill you'd like help negotiating.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            This does not contact your provider. It simply saves your info and lets the AI coach guide you.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Comcast" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="internet">Internet</SelectItem>
                          <SelectItem value="cable">Cable TV</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Monthly Bill ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 89.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-3">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit for Negotiation
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Negotiations</CardTitle>
          <CardDescription>
            Track the progress of your active and past negotiations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : bills && bills.length > 0 ? (
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
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.companyName}</TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell>${bill.currentAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(bill.status)}>{bill.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {bill.savingsAmount ? `$${bill.savingsAmount.toFixed(2)}/mo` : '...'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-10">
                <p className="text-muted-foreground">You haven't submitted any bills for negotiation yet.</p>
                <p className="text-sm text-muted-foreground">Add a bill above to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
