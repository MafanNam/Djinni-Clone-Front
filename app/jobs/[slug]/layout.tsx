import type { Metadata } from "next";

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
