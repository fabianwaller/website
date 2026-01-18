import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { description, title } from "./info";

const fontSans = Poppins({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["sans-serif"],
  display: "swap",
});

export const metadata: Metadata = { title: title, description: description };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body
        className={cn(
          "box-border min-h-screen max-w-full overflow-x-hidden bg-background font-sans tracking-normal text-text-normal antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
