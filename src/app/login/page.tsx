'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
  useAuth,
  useUser,
} from '@/firebase';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAuthError = (error: any) => {
    let title = 'An unknown error occurred';
    let description = 'Please try again.';
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          title = 'Invalid Credentials';
          description = 'The email or password you entered is incorrect.';
          break;
        case 'auth/email-already-in-use':
          title = 'Email Already in Use';
          description =
            'This email is already associated with an account. Please log in.';
          break;
        case 'auth/weak-password':
          title = 'Weak Password';
          description = 'The password must be at least 6 characters long.';
          break;
        case 'auth/invalid-email':
          title = 'Invalid Email';
          description = 'Please enter a valid email address.';
          break;
        default:
          title = 'Authentication Error';
          description = error.message;
      }
    }
    toast({
      variant: 'destructive',
      title: title,
      description: description,
    });
  };

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      initiateEmailSignIn(auth, values.email, values.password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      // The loading state will be managed by the useUser hook's loading status
    }
  }

  async function onSignup(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    try {
      initiateEmailSignUp(auth, values.email, values.password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      // The loading state will be managed by the useUser hook's loading status
    }
  }

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight font-headline">
              BillBully
            </span>
          </Link>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your dashboard and manage your finances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLogin)}
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Login
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Create an Account</CardTitle>
                <CardDescription>
                  Start your journey to financial freedom today. It's free!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(onSignup)}
                    className="space-y-4"
                  >
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Create Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
