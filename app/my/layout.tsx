import {Metadata} from "next"

import {Separator} from "@/components/ui/separator"
import {SidebarNav} from "@/components/forms/components/sidebar-nav"
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: "My account",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/my/profile",
  },
  {
    title: "Contacts and CV",
    href: "/my/account",
  },
  {
    title: "Subscriptions",
    href: "/my/subscriptions",
  },
  {
    title: "Stop list",
    href: "/my/stoplist",
  },
  {
    title: "Hires",
    href: "/my/hires",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({children}: SettingsLayoutProps) {
  return (
    <ProtectRouter>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">My account</h2>
          <p className="text-muted-foreground">
            Manage your account settings, contact and CV.
          </p>
        </div>
        <Separator className="my-6"/>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems}/>
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </ProtectRouter>
  )
}