import {ClockIcon, EyeIcon, MoreVerticalIcon, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {usePostVacancyFeedbackMutation, Vacancy} from "@/lib/features/accounts/accountsApiSlice";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

interface Props {
  vacancy: Vacancy | undefined
}

export default function JobCard({vacancy}: Props) {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const [createFeedback, {isLoading: isLoadingFeedback}] = usePostVacancyFeedbackMutation();
  const router = useRouter()

  function handleFeedback() {
    createFeedback({slug: vacancy?.slug, cover_letter: ''})
      .unwrap()
      .then(() => {
        toast.success('Feedback is send')
        router.push(`/inbox`)
      })
      .catch((err) => {
        toast.error(err.data?.message || "Could not send feedback")
      });
  }

  return (
    <Card
      className='overflow-hidden hover:border-[#504ED7] hover:scale-[1.05] transition-[transform] dark:bg-gray-900'>
      <CardHeader className='flex flex-row items-start p-5 pb-2'>
        <div>
          <CardDescription>
            <span className='flex'>
            <Avatar className='pl-2'>
              <AvatarImage
                className='rounded-full w-7 h-7'
                src={vacancy?.company.image}
                alt={vacancy?.company.name}
              />
            </Avatar>
            <Link href={`/companies/${vacancy?.company.id}`}
                  className='mt-1 text-blue-600 dark:text-blue-500 hover:text-blue-400'>
              {vacancy?.company.name}
            </Link>
            </span>
          </CardDescription>
          <CardTitle>
            <Link href={`/jobs/${vacancy?.slug}`} className='text-blue-600 dark:text-blue-400 hover:text-blue-300'>
              {vacancy?.title}
            </Link>
            <span className='text-green-600 opacity-80'>{(vacancy?.salary || 0) >= 1 && ` $${vacancy?.salary}`}</span>
          </CardTitle>
          <CardDescription className='mt-1'>
            {vacancy?.country} - {vacancy?.employ_options.join(', ')} - {vacancy?.eng_level}
          </CardDescription>
        </div>
        {isAuthenticated &&
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8" size="icon" variant="outline">
                  <MoreVerticalIcon className="h-3.5 w-3.5"/>
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleFeedback} disabled={isLoadingFeedback}>Feedback</DropdownMenuItem>
                <DropdownMenuItem>Save job</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p>
          {vacancy?.description.slice(0, 199)} <Link href={`/jobs/${vacancy?.slug}`}
                                                     className='text-blue-500 hover:text-blue-400'>
          Read more
        </Link>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <ClockIcon className="text-gray-400"/>
          <span className="text-sm text-gray-400">{dayjs(vacancy?.updated_at).format('h:mm A, MMMM D')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <EyeIcon className="text-gray-400"/>
          <span className="text-sm text-gray-400">{vacancy?.views}</span>
          <Users className="text-gray-400"/>
          <span className="text-sm text-gray-400">{vacancy?.feedback}</span>
        </div>
      </CardFooter>
    </Card>
  );
}