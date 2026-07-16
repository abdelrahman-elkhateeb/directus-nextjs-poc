import { Geist_Mono, Inter, Raleway } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

const ralewayHeading = Raleway({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

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
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, ralewayHeading.variable)}
    >
      <body>
        <Navbar />
        <div className="container mx-auto px-4">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  )
}
