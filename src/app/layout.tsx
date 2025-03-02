import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GameStateContext } from "@/contexts/gameStateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudoku - NextJs",
  description: "A simple Sudoku game made it with NextJs and shadcn",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon-light.png',
        href: '/images/favicon-light.png'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon-dark.png',
        href: '/images/favicon-dark.png'
      },
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh min-w-dvw flex flex-col`}
      >
        <GameStateContext>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-dvh w-full flex flex-col">
              {children}
            </main>
          </ThemeProvider>
        </GameStateContext>
      </body>
    </html>
  );
}
