import {Separator} from "@/components/ui/separator"
import {MyCompaniesContainer} from "@/components/companies/MyCompaniesContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">About us</h3>
        <p className="text-sm text-muted-foreground">
          Manage your company for employment new worker
        </p>
      </div>
      <Separator/>
      <MyCompaniesContainer/>
    </div>
  )
}