"use client";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Dot, Eye, MessageCircle,
} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Vacancy} from "@/lib/features/accounts/accountsApiSlice";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import {Checkbox} from "@/components/ui/checkbox";

interface Props {
  vacancy?: Vacancy | undefined;
}

export default function VacancyCard({vacancy}: Props) {
  const router = useRouter()

  return (
    <Card className="overflow-hidden hover:border-[#504ED7] hover:scale-105 transition-[transform] cursor-pointer"
          onClick={() => router.push(`/jobs/${vacancy?.slug}`)}>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid">
          <CardDescription className='flex gap-1'>
            <Avatar>
              <AvatarImage
                className='rounded-full w-8 h-8'
                src={vacancy?.company.image}
                alt={vacancy?.company.name}
              />
            </Avatar>
            <span className='mt-1.5'>
              {vacancy?.company.name}
            </span>
            <Dot className='mt-1'/>
            <span className='mt-1.5'>
              {dayjs(vacancy?.updated_at).format('h:mm A MM/DD')}
            </span>
            <Eye className='mt-2 h-4 w-4 ml-2'/>
            <span className='mt-1.5'>
              {vacancy?.views}
            </span>
            <MessageCircle className='mt-2 h-3.5 w-3.5'/>
            <span className='mt-1.5'>
              {vacancy?.feedback}
            </span>
          </CardDescription>
          <CardTitle className="group flex items-center gap-2 text-lg line-clamp-2">
            {vacancy?.title.substring(0, 30)}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="grid gap-2">
          <div className="font-semibold">Description</div>
          <div className='line-clamp-3'>{vacancy?.description.substring(0, 150)}</div>
          <Separator className="my-2"/>
          <div className="font-semibold">Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Work experience
              </span>
              <span>{(vacancy?.work_exp || 0) > 0 ? `${vacancy?.work_exp} years` : 'Not necessary'}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Salary
              </span>
              <span>${vacancy?.salary}</span>
            </li>
          </ul>
          <Separator className="my-2"/>
          <ul className="grid gap-2">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Country</span>
              <span>{vacancy?.country}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">English level</span>
              <span>{vacancy?.eng_level}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Is only Ukraine</span>
              <span><Checkbox defaultChecked={vacancy?.is_only_ukraine} disabled/></span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Is test task</span>
              <span><Checkbox defaultChecked={vacancy?.is_test_task} disabled/></span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          {(vacancy?.employ_options.length || 0) < 4 ? vacancy?.employ_options.join(', ') : 'Any'}
        </div>
      </CardFooter>
    </Card>
  )
}