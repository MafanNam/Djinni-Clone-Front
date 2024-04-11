import {Separator} from "@/components/ui/separator"
import {MyVacanciesContainer} from "@/components/vacancies/MyVacanciesContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Vacancies</h3>
        <p className="text-sm text-muted-foreground">
          Manage or create vacancy for employment new worker
        </p>
      </div>
      <Separator/>
      <MyVacanciesContainer/>
    </div>
  )
}