"use client";

import {Separator} from "@/components/ui/separator"
import {SidebarNav} from "@/components/forms/components/sidebar-nav"
import ProtectRouter from "@/components/utils/ProtectRouter";
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import Spinner from "@/components/general/Spinner";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({children}: SettingsLayoutProps) {
  const {data: user, isLoading, isFetching} = useRetrieveUserQuery();

  if (isLoading || isFetching) return <FullScreenSpinner/>;

  let sidebarNavItems: { href: string; title: string; }[] = [];
  if (user?.type_profile === "Candidate") {
    sidebarNavItems = [
      {
        title: "Profile",
        href: "/my/profile",
      },
      {
        title: "Contacts and CV",
        href: "/my/contacts-cv",
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
      {
        title: "Account",
        href: "/my/account",
      },
    ]
  } else if (user?.type_profile === "Recruiter") {
    sidebarNavItems = [
      {
        title: "Contacts",
        href: "/my/contacts",
      },
      {
        title: "About us",
        href: "/my/about-us",
      },
      {
        title: 'Team',
        href: '/my/team'
      },
      {
        title: "Subscriptions",
        href: "/my/subscriptions",
      },
      {
        title: "Settings",
        href: "/my/settings",
      },
      {
        title: "Analytics",
        href: "/my/analytics",
      },
      {
        title: "Account",
        href: "/my/account",
      },
    ]
  }


  return (
    <ProtectRouter allowedRoles={['Candidate', 'Recruiter']}>
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