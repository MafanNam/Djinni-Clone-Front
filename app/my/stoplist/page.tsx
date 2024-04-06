import {Separator} from "@/components/ui/separator"
import WorkInProgress from "@/app/work-in-progress/page";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Stop List</h3>
        <p className="text-sm text-muted-foreground">
          Hide your profile from selected employers
        </p>
      </div>
      <Separator/>
      <WorkInProgress/>
    </div>
  )
}