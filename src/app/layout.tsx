import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'BillBully - AI Financial Advocate',
  description: 'AI coaching that helps you negotiate bills, fix credit, and cancel subscriptions with clear guidance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn('antialiased font-body', inter.variable, poppins.variable)}>
        <FirebaseClientProvider>
          <div className="min-h-screen bg-background pt-20 pb-32 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
