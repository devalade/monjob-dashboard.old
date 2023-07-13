import './globals.css';
import { Lexend } from 'next/font/google';
import SupabaseProvider from '@/app/supabase-provider';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata = {
  title: 'MonJob',
  description: 'MonJob est une application de freelance',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={lexend.className}>
        <Toaster />
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
