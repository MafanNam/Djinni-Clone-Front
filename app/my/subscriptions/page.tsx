"use client";
import {Separator} from "@/components/ui/separator"
import {NotificationsForm} from "@/components/forms/notifications-form";
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import Spinner from "@/components/general/Spinner";

export default function Page() {
  const {data: user, isLoading, isFetching} = useRetrieveUserQuery()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscriptions</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator/>
      {isLoading || isFetching ? <Spinner size={200}/>
        : <NotificationsForm user={user}/>
      }
    </div>
  )
}