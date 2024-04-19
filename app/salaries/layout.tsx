import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Djinni | Salaries'
}

export default function SalariesLayout({
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
