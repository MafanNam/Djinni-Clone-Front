import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Company} from "@/lib/features/other/otherApiSlice";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Users} from "lucide-react";

interface Props {
  company: Company | undefined;
}

export default function CompanyDetailCard({company}: Props) {
  return (
    <Card
      className='overflow-hidden border-none shadow-none'>
      <CardHeader className='flex flex-row items-start p-5 pb-2'>
        <div>
          <div className='flex'>
            <Avatar>
              <AvatarImage
                className='rounded-full w-10 h-10'
                src={company?.image}
                alt={company?.name}
              />
            </Avatar>
            <CardTitle className='mt-2 ml-2'>
              {company?.name}
            </CardTitle>
          </div>
          <CardDescription className='pl-2 pt-3'>
            <span className='flex'>
              <Users className='h-4 w-4 mr-1 mt-0.5'/>
              {(company?.num_employees || 0) >= 1 ? ` ${company?.num_employees}/employers` : 'no employers'}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 whitespace-pre-line">
        <h1><strong>Company bio:</strong></h1>
        {company?.bio}
      </CardContent>

      <Separator className='m-6'/>

      {company?.company_url &&
        <CardFooter>
          <CardDescription className='space-x-3'>
            <span><strong>Company url:</strong></span>
            <Link
              href={company.company_url}
              className='text-blue-600 hover:text-blue-500'
              rel="noopener noreferrer"
              target="_blank"
            >
              {company.company_url}
            </Link>
          </CardDescription>
        </CardFooter>
      }

      {company?.dou_url &&
        <CardFooter>
          <CardDescription className='space-x-3'>
            <span><strong>Dou url:</strong></span>
            <Link
              href={company.dou_url}
              className='text-blue-600 hover:text-blue-500'
              rel="noopener noreferrer"
              target="_blank"
            >{company.dou_url}</Link>
          </CardDescription>
        </CardFooter>
      }


    </Card>
  );
}