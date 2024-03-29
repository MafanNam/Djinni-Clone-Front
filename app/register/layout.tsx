import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: 'Job Seek | Sign Up'
}

export default function RegisterLayout({
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
