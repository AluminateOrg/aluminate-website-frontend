'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </ReduxProvider>
  );
}
