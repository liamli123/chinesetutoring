import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liam Li | Academic Tutoring in Maths, Economics, Finance & More",
  description: "Expert academic tutoring from Cambridge-educated tutor with ACA & CFA qualifications. Specializing in Mathematics, Economics, Finance, Statistics, Law, and Oxbridge interview preparation.",
  keywords: ["academic tutoring", "mathematics tutor", "economics tutor", "finance tutor", "Cambridge tutor", "Oxbridge preparation", "A-Level tutoring", "IB tutoring", "university tutoring"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {children}
      </body>
    </html>
  )
}
