import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Job Seek | Sign Up'
}

export default function ProfileLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>{children}</section>
  );
}
