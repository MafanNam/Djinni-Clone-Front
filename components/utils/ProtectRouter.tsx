"use client";

import {redirect} from "next/navigation";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useAppSelector} from "@/lib/hooks";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}


export default function ProtectRouter({children, allowedRoles}: Props) {

  const {user, isLoadingUser} = useAppSelector(state => state.auth);

  if (isLoadingUser) {
    return <FullScreenSpinner/>
  }

  if (!user) {
    return redirect('/login');
  }

  if (!allowedRoles.includes(user?.type_profile as string)) {
    return redirect('/');
  }

  return <>{children}</>
};
