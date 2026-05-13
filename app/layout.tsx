import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { Header } from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: 'My Link',
    template: '%s | My Link',
  },
  description: '모든 링크를 하나의 페이지로. GitHub, 블로그, 포트폴리오를 한 곳에 모으세요.',
  openGraph: {
    type: 'website',
    siteName: 'My Link',
    title: 'My Link',
    description: '모든 링크를 하나의 페이지로.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, inter.variable, "font-sans")}
    >
      <body>
        <Providers>
          <ThemeProvider>
            <Header />
            {children}
            <Toaster position="top-center" richColors closeButton />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
