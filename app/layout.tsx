import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سکوی تصمیم‌یار اقتصادی استاندار تهران | استانداری تهران',
  description: 'سکوی تصمیم‌یار اقتصادی استاندار تهران — پایش لحظه‌ای و ۳۶۰ درجه ۱۶ شهرستان، ۲۲ شهرک صنعتی، ۶ گمرک، خزانه و بانک، زنجیره گندم و نان و شبیه‌ساز سناریوهای اقتصادی با ۱۰ ایجنت هوش مصنوعی',
  openGraph: {
    title: 'سکوی تصمیم‌یار اقتصادی استاندار تهران',
    description: 'حکمرانی داده‌محور، پایش لحظه‌ای و هوش مصنوعی چندایجنتی در خدمت اقتصاد پایتخت',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سکوی تصمیم‌یار اقتصادی استاندار تهران',
    description: 'سامانه تصمیم‌یار و سکوی هوشمند اقتصاد استان تهران',
  },
};

import MainLayout from '@/src/components/layout/MainLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#07111e" />
      </head>
      <body className="min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200" suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
