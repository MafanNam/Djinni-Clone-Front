import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Djinni | Account'
}

export default function AccountLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>{children}</section>
  );
}
