import {redirect} from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "@/components/general/Spinner";
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import {useAppSelector} from "@/lib/hooks";
import {reducer} from "@/components/ui/use-toast";

interface Props {
  // allowedRoles: string[];
  children: React.ReactNode;
}


export default function RequireUser({children}: Props) {
  const access = Cookies.get('access')
  const allowedRoles = ['Candidate']

  const {isLoading, isFetching} = useRetrieveUserQuery();

  const loading = isLoading || isFetching;

  const {user} = useAppSelector(state => state.auth);

  console.log({loading});
  if (loading) {
    return <Spinner size={300}/>;
  }

  if (access && user) {
    redirect('/')
  } else {
    redirect('/login')
  }

  if ((access || user) && allowedRoles.includes(user?.type_profile as string)) {
    return <>{children}</>
  }

  return <>{children}</>
};
