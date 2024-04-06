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
  User, Ban, Mail, ReceiptText
} from "lucide-react";
import {useLogoutMutation, useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import Spinner from "@/components/general/Spinner";
import Link from "next/link";


export default function ProfileDropdownMenu() {
  const [logout,] = useLogoutMutation()
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: user} = useRetrieveUserQuery()


  if (!user) return <Spinner size={20}/>
  // if (isError) return <MessageCircleMore/>

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
          <DropdownMenuItem onClick={() => router.push('/my/profile')}>
            <User className="mr-2 h-4 w-4"/>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/my/account')}>
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