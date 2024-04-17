import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Djinni | Sign up'
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
