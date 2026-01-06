"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateCreditDisputeLetter } from "@/ai/flows/generate-credit-dispute-letters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp, doc } from "firebase/firestore";

const formSchema = z.object({
  creditBureau: z.enum(['equifax', 'transunion', 'experian'], { required_error: "Please select a credit bureau." }),
  accountName: z.string().min(2, { message: "Account name must be at least 2 characters." }),
  accountNumber: z.string().min(2, { message: "Account number must be at least 2 characters." }),
  disputeReason: z.string().min(10, { message: "Please provide a reason for the dispute." }),
  type: z.string({ required_error: "Please select a type."}),
  userExplanation: z.string().optional(),
});

export function DisputeForm() {
  const [letterText, setLetterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      disputeReason: "",
      userExplanation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !firestore) {
        toast({ title: "You must be logged in to create a dispute.", variant: "destructive"});
        return;
    }

    setIsLoading(true);
    setLetterText("");
    try {
        // 1. Save the CreditItem to Firestore
        const creditItemsCollection = collection(firestore, 'users', user.uid, 'credit_items');
        const newCreditItemData = {
            userId: user.uid,
            bureau: values.creditBureau,
            accountName: values.accountName,
            accountNumber: values.accountNumber,
            type: values.type,
            status: 'Disputed',
            disputeDate: new Date().toISOString(),
            createdAt: serverTimestamp(),
        };

        const creditItemRef = await addDocumentNonBlocking(creditItemsCollection, newCreditItemData);

        // 2. Generate the dispute letter using the AI flow
        const letterResult = await generateCreditDisputeLetter({
            userId: user.uid,
            creditBureau: values.creditBureau,
            accountName: values.accountName,
            accountNumber: values.accountNumber,
            disputeReason: values.disputeReason,
            userExplanation: values.userExplanation,
        });

        if (letterResult.letterText && creditItemRef) {
            setLetterText(letterResult.letterText);
            
            // 3. Save the generated letter to the subcollection
            const disputeLettersCollection = collection(creditItemRef, 'dispute_letters');
            await addDocumentNonBlocking(disputeLettersCollection, {
                creditItemId: creditItemRef.id,
                letterType: '609', // Example, this could be dynamic
                generatedText: letterResult.letterText,
                mailedDate: new Date().toISOString(),
                createdAt: serverTimestamp()
            });

            toast({
                title: "Dispute Item Saved & Letter Generated",
                description: "Your dispute has been logged and the letter is ready below.",
            });
        } else {
             throw new Error("Failed to generate or save dispute letter.");
        }
        
    } catch (error) {
        console.error("Error processing dispute:", error);
        toast({
            title: "Error",
            description: "Failed to process your dispute. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
        form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="creditBureau"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Bureau</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a bureau" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="equifax">Equifax Canada</SelectItem>
                    <SelectItem value="transunion">TransUnion Canada</SelectItem>
                    <SelectItem value="experian">Experian (US)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select item type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="late_payment">Late Payment</SelectItem>
                    <SelectItem value="collection">Collection</SelectItem>
                    <SelectItem value="charge_off">Charge Off</SelectItem>
                    <SelectItem value="inquiry">Hard Inquiry</SelectItem>
                    <SelectItem value="personal_info">Incorrect Personal Info</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name / Creditor</FormLabel>
                <FormControl><Input placeholder="e.g., Rogers, TD Bank" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl><Input placeholder="The account number from your report" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
            control={form.control}
            name="disputeReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Dispute</FormLabel>
                <FormControl><Input placeholder="e.g., Not my account, Paid in full" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="userExplanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Explanation (Optional)</FormLabel>
                <FormControl><Textarea placeholder="Provide any extra details about the situation." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate & Save Dispute
        </Button>
      </form>
      {letterText && (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 font-headline">Generated Letter Preview</h3>
            <Textarea
                readOnly
                value={letterText}
                className="h-96 bg-muted text-sm font-mono"
            />
             <Button variant="secondary" className="mt-4">Mail this Letter via Canada Post</Button>
        </div>
      )}
    </Form>
  );
}