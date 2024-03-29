import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/general/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Companies at Djinni'
}

export default function CompaniesLayout({
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
