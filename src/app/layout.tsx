'use client'

import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./store/store";

const karla = localFont({
  src: "./fonts/Karla-VariableFont_wght.woff",
  variable: "--font-karla",
  weight: "100 400 500 600 700 800 900"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${karla.variable} antialiased font-karla`}
      >
                  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
        <Provider store={store}>
            {children}
            </Provider>
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
