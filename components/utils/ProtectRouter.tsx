"use client";

import {redirect} from "next/navigation";
import Spinner from "@/components/general/Spinner";
import {useAppSelector} from "@/lib/hooks";

interface Props {
  // allowedRoles: string[];
  children: React.ReactNode;
}


export default function ProtectRouter({children}: Props) {
  const allowedRoles = ['Candidate']

  // const {isLoading, isFetching} = useRetrieveUserQuery();


  const {user, isAuthenticated, isLoading} = useAppSelector(state => state.auth);

  console.log({isLoading});

  if (isLoading) {
    return <Spinner size={300}/>;
  }

  if (!isAuthenticated) {
    redirect('/login')
  }

  if (user && allowedRoles.includes(user?.type_profile as string)) {
    return <>{children}</>
  } else {
    redirect('/');
  }
};
