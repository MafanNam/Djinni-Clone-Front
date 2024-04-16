import {BriefcaseBusiness} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Candidate} from "@/lib/features/accounts/accountsApiSlice";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {getBadgeVariantFromLabel} from "@/components/inbox/mail-list";

interface Props {
  candidate: Candidate | undefined
}

export default function CandidateCard({candidate}: Props) {
  return (
    <Card
      className='overflow-hidden hover:border-[#504ED7] hover:scale-[1.05] transition-[transform] dark:bg-gray-900'>
      <Link href={`/candidates/${candidate?.id}`}>

        <CardHeader className='flex flex-row items-start p-4 pb-2 bg-blue-100 dark:bg-gray-800'>
          <div>
            <CardTitle className='flex space-x-3'>
              <Avatar className=''>
                <AvatarImage
                  className='rounded-full w-10 h-10'
                  src={candidate?.image}
                  alt={candidate?.first_name}
                />
              </Avatar>
              <span className='mt-2'>{candidate?.first_name} {candidate?.last_name}</span>
              <span className='text-green-600 opacity-80 mt-2'>
                {(candidate?.salary_expectation || 0) >= 1 && ` $${candidate?.salary_expectation}`}
              </span>

            </CardTitle>
            <CardDescription className='mt-1'>
              {candidate?.country}({candidate?.city}) - {candidate?.employ_options.join(', ')} - {candidate?.eng_level}
            </CardDescription>
          </div>
          <span className='mt-2 ml-auto text-muted-foreground text-sm'>
                {candidate?.work_exp
                  ? `${candidate?.work_exp} years of experience`
                  : 'No experience'
                }
          </span>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className='line-clamp-3 text-l'>
            {candidate?.work_exp_bio.substring(0, 300)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-2">
          <div className="flex items-center space-x-1">
            {candidate?.employ_options.map((label) => (
              <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                {label}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-1.5">
            <BriefcaseBusiness className="text-gray-400 w-4 h-4"/>
            <span className="text-sm text-gray-400 mt-0.5">{candidate?.find_job}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}