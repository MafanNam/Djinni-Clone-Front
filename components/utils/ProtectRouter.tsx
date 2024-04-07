"use client";

import {redirect} from "next/navigation";
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}


export default function ProtectRouter({children, allowedRoles}: Props) {
  const {data: user, isLoading, isFetching, isError} = useRetrieveUserQuery();

  if (isLoading || isFetching) {
    return <FullScreenSpinner/>;
  }

  if (isError) {
    redirect('/login')
  }

  if (allowedRoles.includes(user?.type_profile as string)) {
    return <>{children}</>
  } else {
    redirect('/');
  }
};
