import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";
import {cookies} from "next/headers";
import {Mail} from "@/components/inbox/mail";

export const metadata: Metadata = {
  title: 'Djinni | Inbox',
}

export default function InboxLayout({
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}>) {

  const layout = cookies().get("react-resizable-panels:layout")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined


  return (
    <ProtectRouter allowedRoles={['Candidate', 'Recruiter']}>
      <Mail defaultLayout={defaultLayout}>
        {children}
      </Mail>
    </ProtectRouter>
  );
}
