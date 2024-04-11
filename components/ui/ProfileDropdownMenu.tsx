import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {
  ArrowRightLeft,
  LogOut, MessageCircleMore,
  BriefcaseBusiness,
  User, Ban, Mail, ReceiptText, Building2, Handshake, Settings, AreaChart, CircleUserRound
} from "lucide-react";
import {useLogoutMutation, useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


export default function ProfileDropdownMenu() {
  const [logout, {isLoading: isLoadingLogout}] = useLogoutMutation()
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: user, isLoading, isFetching, isError} = useRetrieveUserQuery()

  if (isLoadingLogout) return <FullScreenSpinner/>
  if (isLoading || isFetching || !user) return <Skeleton className="h-12 w-12 rounded-full"/>
  if (isError) return <h1>Error...</h1>

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        router.push("/");
      })
  }

  let MenuItems;
  if (user.type_profile === 'Candidate') {
    MenuItems = (
      <>
        <DropdownMenuItem onClick={() => router.push('/my/profile')}>
          <CircleUserRound className="mr-2 h-4 w-4"/>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/contacts-cv')}>
          <ReceiptText className="mr-2 h-4 w-4"/>
          <span>Contacts and CV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/subscriptions')}>
          <Mail className="mr-2 h-4 w-4"/>
          <span>Subscriptions</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/stoplist')}>
          <Ban className="mr-2 h-4 w-4"/>
          <span>Stop list</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/hires')}>
          <BriefcaseBusiness className="mr-2 h-4 w-4"/>
          <span>Hires</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/account')}>
          <User className="mr-2 h-4 w-4"/>
          <span>Account</span>
        </DropdownMenuItem>
      </>
    );
  } else if (user.type_profile === 'Recruiter') {
    MenuItems = (
      <>
        <DropdownMenuItem onClick={() => router.push('/my/contacts')}>
          <ReceiptText className="mr-2 h-4 w-4"/>
          <span>Contacts</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/about-us')}>
          <Building2 className="mr-2 h-4 w-4"/>
          <span>About us</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/vacancies')}>
          <Handshake className="mr-2 h-4 w-4"/>
          <span>Vacancies</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/subscriptions')}>
          <Mail className="mr-2 h-4 w-4"/>
          <span>Subscriptions</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/settings')}>
          <Settings className="mr-2 h-4 w-4"/>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/analytics')}>
          <AreaChart className="mr-2 h-4 w-4"/>
          <span>Analytics</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my/account')}>
          <User className="mr-2 h-4 w-4"/>
          <span>Account</span>
        </DropdownMenuItem>
      </>
    )
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline' className="flex bg-white bg-opacity-50 rounded-full">
          <Image height={100} width={100} className="rounded-full" src={user.image} alt="user photo"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          {MenuItems}
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4"/>
            <span>Log out</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/work-in-progress')}>
            <ArrowRightLeft className="mr-2 h-4 w-4"/>
            <span>Switch to Ukraine</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageCircleMore className="mr-2 h-4 w-4"/>
            <Link href={'https://blog.djinni.co/'} rel="noopener noreferrer" target="_blank">
              <span>Blog Djinni</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}