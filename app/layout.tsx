import './globals.css';
import { Playfair_Display } from 'next/font/google';
import { Providers } from './providers';

const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata = {
  title: 'Luna Flow - Menstrual Cycle Tracking',
  description: 'Track your menstrual cycle with elegance and insight',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={playfair.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}