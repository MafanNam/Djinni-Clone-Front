import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/general/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Job Seek | Sign In'
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <section>{children}</section>
    </>
  );
}
