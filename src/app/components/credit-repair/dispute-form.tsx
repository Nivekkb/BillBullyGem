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

const formSchema = z.object({
  creditBureau: z.enum(['equifax', 'transunion'], { required_error: "Please select a credit bureau." }),
  accountName: z.string().min(2, { message: "Account name must be at least 2 characters." }),
  accountNumber: z.string().min(2, { message: "Account number must be at least 2 characters." }),
  disputeReason: z.string().min(10, { message: "Please provide a reason for the dispute." }),
  userExplanation: z.string().optional(),
});

export function DisputeForm() {
  const [letterText, setLetterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    setIsLoading(true);
    setLetterText("");
    try {
      const result = await generateCreditDisputeLetter({
          userId: "user-123", // Replace with actual user ID
          ...values,
      });
      setLetterText(result.letterText);
      toast({
        title: "Dispute Letter Generated",
        description: "Your personalized dispute letter is ready below.",
      });
    } catch (error) {
        console.error("Error generating letter:", error);
        toast({
            title: "Error",
            description: "Failed to generate the dispute letter. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
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
        </div>
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
          Generate Dispute Letter
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
