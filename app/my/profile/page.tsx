import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/forms/profile-form"
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import Spinner from "@/components/general/Spinner";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}