import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: 'Job Seek | Sign Up'
}

export default function AboutUsLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter allowedRoles={['Recruiter']}>
      <section>{children}</section>
    </ProtectRouter>
  );
}
