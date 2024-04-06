import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/forms/profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Contact and CV</h3>
        <p className="text-sm text-muted-foreground">
          Job search on Djinni is anonymous.
          Only those to whom you open contacts will see your personal data.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}