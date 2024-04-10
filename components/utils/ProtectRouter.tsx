"use client";

import {redirect} from "next/navigation";
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useEffect} from "react";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}


export default function ProtectRouter({children, allowedRoles}: Props) {
  const {data: user, isLoading, isFetching, isError} = useRetrieveUserQuery();


  // async function check() {
  //   if (isError) {
  //     redirect('/login');
  //   }
  //
  //   if (!allowedRoles.includes(user?.type_profile as string)) {
  //     redirect('/');
  //   }
  // }

  // @ts-ignore
  useEffect(() => {
    if (isLoading || isFetching) {
      return () => <FullScreenSpinner/>
    }

    if (isError) {
      redirect('/login');
    }

    if (!allowedRoles.includes(user?.type_profile as string)) {
      redirect('/');
    }
  }, [isError, isLoading, isFetching]);

  return <>{children}</>
};
