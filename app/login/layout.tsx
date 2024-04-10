import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Djinni | Sign In'
}

export default function LoginLayout({
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
