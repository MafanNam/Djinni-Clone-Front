import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: 'Djinni | Vacancy Edit'
}

export default function VacancyEditLayout({
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
