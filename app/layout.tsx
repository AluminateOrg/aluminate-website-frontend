import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Alumni Portal System - Reimagine Alumni Engagement',
  description: 'A powerful cloud-based platform designed to help universities, colleges, and organizations engage and manage their alumni communities through dedicated, isolated portal environments.',
  keywords: 'alumni portal, alumni management, university alumni, alumni engagement, alumni software, alumni platform',
  authors: [{ name: 'Alumni Portal System' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Alumni Portal System - Reimagine Alumni Engagement',
    description: 'Transform your alumni network with our dedicated cloud portal solution',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}