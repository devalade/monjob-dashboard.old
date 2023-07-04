import './globals.css'
import { Lexend } from 'next/font/google'
import SupabaseProvider from "@/app/supabase-provider";

const lexend = Lexend({ subsets: ['latin'] })

export const metadata = {
  title: 'MonJob',
  description: 'MonJob est une application de freelance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
      </body>
    </html>
  )
}
