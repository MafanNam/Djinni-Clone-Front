"use client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useRouter} from "next/navigation";
import {
  useRetrieveCandidateQuery,
} from "@/lib/features/accounts/accountsApiSlice";
import {BriefcaseBusiness, FolderClosed, Laptop, MapPin} from "lucide-react";
import CandidateDetailCard from "@/components/candidates/CandidateDetailCard";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {getBadgeVariantFromLabel} from "@/components/inbox/mail-list";


export default function Page({params}: { params: { id: number } }) {
  const {data: candidate, isLoading, isFetching} = useRetrieveCandidateQuery(params.id)

  const router = useRouter();

  let loader = null;
  if (isLoading || isFetching) {
    loader = (
      <div>
        {Array.from('1234567890').map((_, index,) =>
          <div key={index} className='bg-gray-900 bg-muted/30 rounded-2xl p-4'>
            <div className='grid gap-2'>
              <div className='flex justify-center items-center w-full'>
                <Skeleton className="h-7 w-7 rounded-full ml-4"/>
                <Skeleton className="h-7 w-24 rounded-full ml-2"/>
                <Skeleton className="h-7 w-7 rounded-xl ml-auto"/>
              </div>
              <Skeleton className="h-8 w-60 lg:w-72 rounded-2xl ml-2"/>
              <Skeleton className="h-6 w-72 lg:w-96 rounded-2xl ml-2"/>
              <Skeleton className="h-28 w-full rounded-2xl mt-2"/>
            </div>
            <div className='flex justify-center items-center w-full mt-4'>
              <Skeleton className="h-8 w-36 rounded-2xl ml-2"/>
              <Skeleton className="h-8 w-28 rounded-2xl ml-auto"/>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className='pt-10 pb-7 md:px-6 px-5'>
        <div className="text-white min-h-screen">
          <div className="max-w-7xl mx-auto py-4 px-1 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 ml-2">
              <Breadcrumb>
                <BreadcrumbList className='text-l text-black dark:text-white cursor-pointer'>
                  <BreadcrumbItem>
                    <BreadcrumbLink className='hover:text-blue-300'>
                      <h1 onClick={() => router.push("/candidates")}>All candidates</h1>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator/>
                  <BreadcrumbItem>
                    {isLoading || isFetching ? <Skeleton className="h-6 w-36 rounded-xl"/> :
                      <BreadcrumbPage
                        className='text-blue-500'>{candidate?.first_name} {candidate?.last_name}</BreadcrumbPage>
                    }
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb></div>
            <Separator/>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="col-span-2 space-y-6">
                {loader || <CandidateDetailCard candidate={candidate}/>
                }
              </div>

              <div className='lg:block w-96 md:w-auto'>
                <Card className='grow'>
                  <CardHeader className='p-4'>
                    <div>
                      <div className='flex'>
                        <Avatar className='w-20 h-20'>
                          <AvatarImage
                            className='rounded-full w-20 h-20'
                            src={candidate?.image}
                            alt={candidate?.first_name}
                          />
                        </Avatar>
                        <span className='flex ml-2 items-center'>{candidate?.first_name} {candidate?.last_name}</span>
                      </div>
                      <CardDescription className='pl-2 pt-2'>
                        English level: {candidate?.eng_level}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <Separator/>

                  <CardContent className='p-4'>
                    <div className='flex'>
                      <FolderClosed className='w-4 h-4 mt-0.5 mr-2'/>
                      <CardDescription>{candidate?.category}</CardDescription>
                    </div>
                  </CardContent>

                  <Separator/>

                  <CardContent className='p-4 space-y-2'>
                    <div className='flex'>
                      <Laptop className='w-4 h-4 mt-0.5 mr-2'/>
                      <CardDescription>
                        {(candidate?.employ_options.length || 0) > 0
                          ? candidate?.employ_options.join(', ')
                          : 'No employ options'
                        }
                      </CardDescription>
                    </div>

                    <div className='flex'>
                      <MapPin className='w-4 h-4 mt-0.5 mr-2'/>
                      <CardDescription>{candidate?.country}</CardDescription>
                    </div>

                  </CardContent>

                  <Separator/>

                  <CardContent className="flex justify-between p-4">
                    <div className="flex items-center space-x-1">
                      {candidate?.employ_options.map((label) => (
                        <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                          {label}
                        </Badge>
                      ))}
                    </div>

                  </CardContent>

                  <Separator/>

                  {(candidate?.skills.length || 0) > 0 &&
                    <CardContent className='p-4 space-y-1'>
                      <CardDescription><strong>Skills:</strong></CardDescription>
                      <CardDescription>{candidate?.skills.join(', ')}</CardDescription>
                    </CardContent>
                  }
                  <CardFooter>
                    <div className="flex items-center space-x-1.5">
                      <BriefcaseBusiness className="text-gray-400 w-4 h-4"/>
                      <span className="text-sm text-gray-400 mt-0.5">{candidate?.find_job}</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}