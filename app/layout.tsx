import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { Header } from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";

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
