import {CalendarDays, EyeIcon, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Vacancy} from "@/lib/features/accounts/accountsApiSlice";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Props {
  vacancy: Vacancy | undefined;
  isCandidate: boolean;
}

export default function JobDetailCard({vacancy, isCandidate}: Props) {
  console.log(vacancy)

  return (
    <Card
      className='overflow-hidden border-none shadow-none'>
      <CardHeader className='flex flex-row items-start p-5 pb-2'>
        <div>
          <CardTitle>
            {vacancy?.title}
            <span className='text-green-600 opacity-80'>{(vacancy?.salary || 0) >= 1 && ` $${vacancy?.salary}`}</span>
          </CardTitle>
          <CardDescription>
            <span className='flex pt-2'>
            <Avatar className='pt-2'>
              <AvatarImage
                className='rounded-full w-7 h-7'
                src={vacancy?.company.image}
                alt={vacancy?.company.name}
              />
            </Avatar>
            <Link href={`/companies/${vacancy?.company.id}`}
                  className='mt-3 text-blue-600 dark:text-blue-500 hover:text-blue-400'>
              {vacancy?.company.name}
            </Link>
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-4 whitespace-pre-line">
        {vacancy?.description}
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-2">
        <h1><strong>Requirements:</strong></h1>
        <h1 className='whitespace-pre-line'>{vacancy?.requirements}</h1>
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-4">
        <h1><strong>Other</strong></h1>
        <h1 className='whitespace-pre-line'>{vacancy?.other}</h1>
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-2">
        <h1><strong>About {vacancy?.company.name}</strong></h1>
        <h1 className='whitespace-pre-line'>{vacancy?.company.bio}</h1>
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-2">
        <h1><strong>Company website:</strong></h1>
        <Link
          href={vacancy?.company.company_url || ''}
          rel="noopener noreferrer"
          target="_blank"
          className='text-blue-500 hover:text-blue-400'
        >
          {vacancy?.company.company_url}
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <div className=" flex items-center space-x-2">
          <CalendarDays className=" text-gray-400"/>
          <span
            className=" text-sm text-gray-400">Job posted on {dayjs(vacancy?.updated_at).format('MMMM D YYYY')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <EyeIcon className=" text-gray-400"/>
          <span className=" text-sm text-gray-400">{vacancy?.views} views</span>
          <Users className=" text-gray-400"/>
          <span className=" text-sm text-gray-400">{vacancy?.feedback} applications</span>
        </div>
      </CardFooter>
      <CardFooter>
        <Button className='w-48 dark:text-gray-200' disabled={!isCandidate}>
          Apply for the job
        </Button>
      </CardFooter>
    </Card>
  );
}