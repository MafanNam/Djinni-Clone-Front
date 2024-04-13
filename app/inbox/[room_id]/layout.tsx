import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: 'Djinni | Inbox',
}

export default function InboxLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter allowedRoles={['Candidate', 'Recruiter']}>
      <section>{children}</section>
    </ProtectRouter>
  );
}
