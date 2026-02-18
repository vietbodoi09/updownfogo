import type { Metadata } from 'next';
import { ClientProvider } from '@/components/ClientProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'FogoUpDown - BTC Prediction on Fogo',
  description: 'Predict Bitcoin price movements with Fogo Sessions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
