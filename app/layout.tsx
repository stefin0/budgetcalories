import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav-bar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Budget Calories",
  description: "Budget your calories easily!",
  other: { chrome: "nointentdetection" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <>
              <Navbar />
              {children}
            </>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
