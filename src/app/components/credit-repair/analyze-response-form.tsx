"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { analyzeUploadedCreditBureauResponses, AnalyzeUploadedCreditBureauResponsesOutput } from "@/ai/flows/analyze-uploaded-credit-bureau-responses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  file: z.any().refine(file => file?.length > 0, "A file is required."),
  userDisputeDetails: z.string().min(10, { message: "Please describe your original dispute." }),
});

const fileToDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function AnalyzeResponseForm() {
  const [analysis, setAnalysis] = useState<AnalyzeUploadedCreditBureauResponsesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userDisputeDetails: "",
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const file = values.file[0];
      if (!file) {
        toast({ title: "No file selected", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const creditBureauResponseDataUri = await fileToDataURI(file);
      
      const result = await analyzeUploadedCreditBureauResponses({
          creditBureauResponseDataUri,
          userDisputeDetails: values.userDisputeDetails,
      });

      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "The AI has analyzed the bureau's response.",
      });
    } catch (error) {
        console.error("Error analyzing response:", error);
        toast({
            title: "Error",
            description: "Failed to analyze the response. Please check the file and try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Bureau Response Document</FormLabel>
                    <FormControl>
                        <Input type="file" accept="application/pdf,image/*" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="userDisputeDetails"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Original Dispute Details</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Briefly describe the item you disputed and why. e.g., 'Disputed a late payment from Rogers on account #123 because I was never late.'" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Response
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">AI is analyzing your document...</p>
        </div>
      )}

      {analysis && (
        <Card className="mt-8 bg-secondary">
            <CardHeader>
                <CardTitle className="font-headline">AI Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Summary</h4>
                    <p className="text-muted-foreground">{analysis.summary}</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Dispute Outcomes</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                        {analysis.disputeOutcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold">Recommended Next Steps</h4>
                    <p className="text-muted-foreground">{analysis.nextSteps}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
