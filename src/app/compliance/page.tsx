"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { analyzeCompliance, AnalyzeComplianceOutput } from "@/ai/flows/ai-compliance-tool";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useFirestore, useUser, useMemoFirebase, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";

const formSchema = z.object({
  featureDescription: z.string().min(20, { message: "Feature description must be at least 20 characters." }),
  relevantLaws: z.string().min(20, { message: "Please provide the relevant laws." }),
});

const defaultLaws = `Consumer Reporting Act (federal), Personal Information Protection and Electronic Documents Act (PIPEDA), and relevant provincial consumer protection acts (e.g., Ontario's Consumer Protection Act).`;

export default function CompliancePage() {
  const [analysis, setAnalysis] = useState<AnalyzeComplianceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();

  const complianceCollection = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, "users", user.uid, "compliance_checks")
        : null,
    [user, firestore]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featureDescription: "",
      relevantLaws: defaultLaws,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeCompliance(values);
      setAnalysis(result);
      if (complianceCollection) {
        addDocumentNonBlocking(complianceCollection, {
          featureDescription: values.featureDescription,
          relevantLaws: values.relevantLaws,
          result,
          createdAt: serverTimestamp(),
        });
      }
      toast({
        title: "Compliance Analysis Complete",
        description: "The AI has reviewed the feature against the specified laws.",
      });
    } catch (error) {
        console.error("Error analyzing compliance:", error);
        toast({
            title: "Error",
            description: "Failed to perform compliance analysis. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Compliance Tool</h1>
        <p className="text-muted-foreground">Analyze proposed credit-related features for compliance with Canadian consumer protection laws.</p>
        <p className="text-sm text-muted-foreground">
          This is guidance only. It does not file or send anything for you.
        </p>
      </div>
      <Button variant="link" onClick={() => router.back()} className="text-primary pl-0">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Compliance Check</CardTitle>
          <CardDescription>Describe a feature to check its compliance.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            The output is advisory. You decide how to use it and what to send.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="featureDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the feature in detail. e.g., 'The app automatically generates and sends goodwill letters for paid-off debts...'" {...field} className="h-32" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relevantLaws"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Laws</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Compliance
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">AI is running compliance checks...</p>
        </div>
      )}

      {analysis && (
        <Card className={cn("mt-8", analysis.isCompliant ? "border-green-500" : "border-red-500")}>
            <CardHeader className="flex flex-row items-start gap-4">
                {analysis.isCompliant ? <CheckCircle className="h-10 w-10 text-green-500 mt-1" /> : <XCircle className="h-10 w-10 text-red-500 mt-1" />}
                <div>
                    <CardTitle className={cn("font-headline", analysis.isCompliant ? "text-green-600" : "text-red-600")}>
                        {analysis.isCompliant ? "Likely Compliant" : "Potential Compliance Issues"}
                    </CardTitle>
                    <CardDescription>Based on the AI's analysis.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Rationale</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{analysis.complianceRationale}</p>
                </div>
                {!analysis.isCompliant && analysis.suggestedAdjustments && (
                    <div>
                        <h4 className="font-semibold">Suggested Adjustments</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{analysis.suggestedAdjustments}</p>
                    </div>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
