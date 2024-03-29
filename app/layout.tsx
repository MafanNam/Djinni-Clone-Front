import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers/TanStackProvider";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Job Seek | Home'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scroll-auto'>
      <body className={inter.className}>
          <Navbar/>
          <TanStackProvider>
            {children}
          </TanStackProvider>
          <Footer/>
      </body>
    </html>
  );
}
