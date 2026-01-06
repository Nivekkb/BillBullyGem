'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase';
import { collection, serverTimestamp, doc } from 'firebase/firestore';

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateCancellationRequest } from '@/ai/flows/ai-subscription-cancellation';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import type { Subscription } from '@/lib/types';


const subscriptionSchema = z.object({
  serviceName: z.string().min(2, { message: 'Service name is required.' }),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive({ message: 'Amount must be positive.' })
  ),
  billingFrequency: z.string({ required_error: 'Please select a frequency.' }),
  reason: z.string().min(5, { message: 'Please provide a reason.' }),
  additionalDetails: z.string().optional(),
});


export default function SubscriptionCancellationPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRequest, setGeneratedRequest] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const subscriptionsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'subscriptions')
        : null,
    [user, firestore]
  );

  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useCollection<Subscription>(subscriptionsQuery);

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
        serviceName: '',
        amount: 0,
        billingFrequency: 'monthly',
        reason: '',
        additionalDetails: '',
    },
  });

  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'secondary';
      case 'canceled':
        return 'default';
      default:
        return 'outline';
    }
  };

  async function onSubmit(values: z.infer<typeof subscriptionSchema>) {
    if (!user || !firestore) return;

    setIsLoading(true);

    try {
        // 1. Add to Firestore first to get an ID
        const newSub = {
            userId: user.uid,
            serviceName: values.serviceName,
            amount: values.amount,
            billingFrequency: values.billingFrequency,
            status: 'Active',
            createdAt: serverTimestamp(),
        };
        const subsCollection = collection(firestore, 'users', user.uid, 'subscriptions');
        addDocumentNonBlocking(subsCollection, newSub);

        // 2. Generate cancellation request
        const result = await generateCancellationRequest({
            subscriptionName: values.serviceName,
            reason: values.reason,
            additionalDetails: values.additionalDetails,
        });

        if (result.cancellationRequest) {
            setGeneratedRequest(result.cancellationRequest);
            setIsAlertOpen(true);
        }

        toast({
            title: 'Subscription Added & Request Generated!',
            description: `${values.serviceName} has been added to your list.`,
        });

        form.reset();

    } catch(error) {
        console.error("Failed to generate cancellation request:", error);
        toast({
            title: 'Error',
            description: 'Could not generate the cancellation request.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  }

  const handleCancelSubscription = (subId: string) => {
      if (!user || !firestore) return;
      const subDocRef = doc(firestore, 'users', user.uid, 'subscriptions', subId);
      updateDocumentNonBlocking(subDocRef, {
          status: 'Canceled',
          cancellationDate: new Date().toISOString(),
      });
      toast({
          title: "Subscription Canceled",
          description: "The subscription has been marked as canceled."
      });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Subscription Manager
        </h1>
        <p className="text-muted-foreground">
          Tired of paying for services you don't use? We'll help you cancel them.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Add & Cancel a Subscription</CardTitle>
          <CardDescription>
            Fill out the details below to log a subscription and generate a cancellation request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Netflix, Spotify" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 15.49" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="billingFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Cancellation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Too expensive, no longer needed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="e.g., Account email is user@example.com, Member ID is 12345" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 Generate Cancellation Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Subscriptions</CardTitle>
          <CardDescription>A list of your detected and added recurring subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoadingSubscriptions ? (
                 <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : subscriptions && subscriptions.length > 0 ? (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Service Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {subscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.serviceName}</TableCell>
                        <TableCell>
                            <Badge variant={getBadgeVariant(sub.status)}>{sub.status}</Badge>
                        </TableCell>
                        <TableCell>${sub.amount.toFixed(2)}</TableCell>
                        <TableCell className='capitalize'>{sub.billingFrequency}</TableCell>
                        <TableCell className="text-right">
                            {sub.status === 'Active' && (
                                <Button variant="ghost" size="sm" onClick={() => handleCancelSubscription(sub.id)}>Cancel</Button>
                            )}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">You haven't added any subscriptions yet.</p>
                    <p className="text-sm text-muted-foreground">Add a subscription above to get started!</p>
                </div>
            )}
        </CardContent>
      </Card>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Generated Cancellation Request</AlertDialogTitle>
                <AlertDialogDescription>
                    Copy the text below and send it to the service provider to cancel your subscription.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
                readOnly
                value={generatedRequest || ''}
                className="h-64 bg-muted text-sm font-mono"
            />
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => {
                    navigator.clipboard.writeText(generatedRequest || '');
                    toast({title: "Copied to clipboard!"})
                }}>
                    Copy Text & Close
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
