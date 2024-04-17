import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Djinni | Companies'
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
