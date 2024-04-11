import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";


export const metadata: Metadata = {
  title: 'Djinni | Candidates'
}

export default function CandidatesLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectRouter allowedRoles={['Recruiter']}>
        <section>{children}</section>
      </ProtectRouter>
    </>
  );
}
