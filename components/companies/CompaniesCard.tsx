import {BriefcaseBusiness, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Company} from "@/lib/features/other/otherApiSlice";

interface Props {
  company: Company | undefined
}

export default function CompaniesCard({company}: Props) {
  return (
    <Card
      className='overflow-hidden hover:border-[#504ED7] hover:scale-[1.05] transition-[transform] dark:bg-gray-900'>
      <Link href={`/companies/${company?.id}`}>

        <CardHeader className='flex flex-row items-start p-4 pb-2 bg-blue-100 dark:bg-gray-800'>
          <div>
            <CardTitle className='flex space-x-3'>
              <Avatar>
                <AvatarImage
                  className='rounded-full w-10 h-10'
                  src={company?.image}
                  alt={company?.name}
                />
              </Avatar>
              <span className='mt-2'>{company?.name}</span>
            </CardTitle>
            <CardDescription className='mt-1'>
              {company?.country}
            </CardDescription>
          </div>
          <span className='mt-2 flex ml-auto text-muted-foreground text-sm'>
            <Users className='h-4 w-4 mr-1 mt-0.5'/>
            {(company?.num_employees || 0) >= 1 ? ` ${company?.num_employees}/employers` : ''}
          </span>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className='line-clamp-4 text-l'>
            {company?.bio.substring(0, 600)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-2">
          {company?.company_url &&
            <div className="flex items-center space-x-1">
              {company.company_url}
            </div>
          }
          {company?.dou_url &&
            <div className="flex items-center space-x-1.5">
              <BriefcaseBusiness className="text-gray-400 w-4 h-4 mt-0.5"/>
              <span className="text-sm text-gray-400 mt-0.5">{company.dou_url}</span>
            </div>
          }
        </CardFooter>
      </Link>
    </Card>
  );
}