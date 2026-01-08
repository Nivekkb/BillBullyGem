'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useUser,
  useFirestore,
  updateDocumentNonBlocking,
  useDoc,
  useMemoFirebase,
  setDocumentNonBlocking,
} from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
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
import { pricingTiers } from '@/lib/pricing';
import { useEffect } from 'react';
import type { User as AppUser } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
});

export default function SettingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  
  const { data: userData, isLoading: isUserDataLoading } = useDoc<AppUser>(userDocRef);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (userData) {
      profileForm.reset({
        name: userData.name || '',
        email: userData.email || '',
      });
    } else if (user) {
        profileForm.reset({
            name: user.displayName || '',
            email: user.email || '',
        });
    }
  }, [userData, user, profileForm]);


  async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    if (!userDocRef || !user) return;

    const dataToUpdate = {
        name: values.name,
        email: values.email, // email is read-only, but good to have
        id: user.uid, // Ensure the ID is present to satisfy security rules
        updatedAt: serverTimestamp(),
    };

    if (userData) {
      // If user data exists, update the document
      updateDocumentNonBlocking(userDocRef, dataToUpdate);
    } else {
      // This case should be handled by the FirebaseProvider now, but as a safe fallback...
      setDocumentNonBlocking(userDocRef, dataToUpdate, { merge: true });
    }

    toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved.',
    });
  }

  const currentTier = pricingTiers.find(t => t.name.toLowerCase().includes(userData?.subscriptionTier?.replace('_', ' ') ?? 'free'));


  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings, profile, and subscription plan.
        </p>
      </div>
      <Button variant="link" onClick={() => router.back()} className="text-primary pl-0">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

        {isUserDataLoading ? (
             <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ): (
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                        <CardTitle className="font-headline">Subscription Plan</CardTitle>
                        <CardDescription>
                            Manage your billing and subscription details.
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-md bg-secondary mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Plan</p>
                                        <p className="text-lg font-semibold">{currentTier?.name}</p>
                                    </div>
                                    <Badge variant="default">{currentTier?.price}{currentTier?.period}</Badge>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Upgrade anytime to unlock guided negotiations and advanced tools.
                            </p>
                            <Button asChild>
                              <Link href="/upgrade">Update Subscription</Link>
                            </Button>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                        <CardTitle className="font-headline">Profile</CardTitle>
                        <CardDescription>
                            This information is only used inside your account.
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Form {...profileForm}>
                            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <FormField
                                control={profileForm.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="you@example.com" {...field} readOnly disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                                {profileForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                            </form>
                        </Form>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Account Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Button variant="outline" className="w-full">Export My Data</Button>
                         <Button variant="destructive" className="w-full">Delete My Account</Button>
                    </CardContent>
                </Card>

            </div>
        )}

     
    </div>
  );
}
