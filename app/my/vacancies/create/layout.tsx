import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: 'Djinni | Vacancy Create'
}

export default function CreateVacancyLayout({
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
