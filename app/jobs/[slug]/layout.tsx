import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Jobs at Djinni'
}

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}
