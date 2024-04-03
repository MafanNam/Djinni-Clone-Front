import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import Setup from "@/components/utils/Setup";

const inter = Inter({subsets: ["latin"]});

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
    <ReduxStoreProvider>
      <Setup/>
      <Navbar/>

      <main>{children}</main>

      <Footer/>
    </ReduxStoreProvider>
    </body>
    </html>
  );
}
