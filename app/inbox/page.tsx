import {Mail} from "@/components/inbox/mail"
import {mails} from "@/components/inbox/data"
import {cookies} from "next/headers";

export default function MailPage() {

  const layout = cookies().get("react-resizable-panels:layout")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined

  return (
    <>
      <div className="flex-col md:flex mb-1">
        <Mail
          mails={mails}
          defaultLayout={defaultLayout}
        />
      </div>
    </>
  )
}