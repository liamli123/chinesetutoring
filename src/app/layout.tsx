import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liam Li | Academic Tutoring in Maths, Economics, Finance & More",
  description: "Expert academic tutoring from Cambridge-educated tutor with ACA & CFA qualifications. Specializing in Mathematics, Economics, Finance, Statistics, Law, and Oxbridge interview preparation.",
  keywords: ["academic tutoring", "mathematics tutor", "economics tutor", "finance tutor", "Cambridge tutor", "Oxbridge preparation", "A-Level tutoring", "IB tutoring", "university tutoring"],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
