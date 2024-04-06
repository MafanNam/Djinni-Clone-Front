import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import Setup from "@/components/utils/Setup";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Djinni | Home'
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scroll-auto' suppressHydrationWarning>
    <body className={cn(
      "min-h-screen bg-background font-sans antialiased",
      inter.variable
    )}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ReduxStoreProvider>
        <Setup/>
        <Navbar/>

        <main>{children}</main>

        <Footer/>
      </ReduxStoreProvider>

    </ThemeProvider>
    </body>
    </html>
  );
}
