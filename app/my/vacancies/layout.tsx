import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: 'Djinni | My Vacancies'
}

export default function VacanciesLayout({
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
