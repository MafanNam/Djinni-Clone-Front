"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {useRetrieveVacancyQuery} from "@/lib/features/vacancies/vacancyPublicApiSlice";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import UA from "@/public/images/ua.svg"
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useRouter} from "next/navigation";
import JobDetailCard from "@/components/jobs/JobDetailCard";
import {
  useRetrieveMeCandidateContactCvQuery,
  useRetrieveMeCandidateQuery
} from "@/lib/features/accounts/accountsApiSlice";
import {useAppSelector} from "@/lib/hooks";
import {CircleCheckBig, CircleX, ClipboardList, FolderClosed, Laptop, MapPin} from "lucide-react";
import {useState} from "react";


const engLvl = [
  {value: 'none', name: 'No English', index: 0},
  {value: 'beginner', name: 'Beginner/Elementary', index: 1},
  {value: 'intermediate', name: 'Intermediate', index: 2},
  {value: 'upper_intermediate', name: 'Upper-Intermediate', index: 3},
  {value: 'advanced', name: 'Advanced/Fluent', index: 4},
]


export default function Page({params}: { params: { slug: string } }) {
  const {data: vacancy, isLoading, isFetching} = useRetrieveVacancyQuery(params.slug)
  const {
    data: contactCv,
    isLoading: isLoadingCv,
    isFetching: isFetchingCv
  } = useRetrieveMeCandidateContactCvQuery();

  const {
    data: candidate,
    isLoading: isLoadingCandidate,
    isFetching: isFetchingCandidate,
    error,
  } = useRetrieveMeCandidateQuery()
  const {isAuthenticated, isLoading: isLoadingAuth} = useAppSelector(state => state.auth)
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const router = useRouter();

  // @ts-ignore
  const isCandidate = isAuthenticated && error?.status !== 403

  const candidateEngIndex = engLvl.find((item) => item.value === candidate?.eng_level)?.index
  const vacancyEngIndex = engLvl.find((item) => item.name === vacancy?.eng_level)?.index

  const equalCandidateEngLvl = (candidateEngIndex || 0) >= (vacancyEngIndex || 0);
  const equalCandidateWorkExp = (vacancy?.work_exp || 0) <= (candidate?.work_exp || 0);
  const equalCandidateSalary = (vacancy?.salary || 0) >= (candidate?.salary_expectation || 0);


  let loader = null;
  if (isLoading || isFetching || isLoadingCandidate || isFetchingCandidate || isLoadingAuth || isLoadingCv || isFetchingCv) {
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
                      <h1 onClick={() => router.push("/jobs")}>All jobs</h1>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator/>
                  <BreadcrumbItem>
                    {isLoading || isFetching ? <Skeleton className="h-6 w-36 rounded-xl"/> :
                      <BreadcrumbPage className='text-blue-500'>{vacancy?.title}</BreadcrumbPage>
                    }
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb></div>
            <Separator/>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="col-span-2 space-y-6">
                {loader ||
                  <JobDetailCard
                    vacancy={vacancy}
                    contactCv={contactCv}
                    isCandidate={isCandidate}
                    isOpenFeedback={isOpenFeedback}
                    setIsOpenFeedback={setIsOpenFeedback}
                  />
                }
              </div>

              {isCandidate && (
                <div className='lg:block w-96 md:w-auto'>
                  <Card className='grow'>
                    <CardHeader>
                      <div>
                        <div className='flex'>
                          {equalCandidateEngLvl
                            ? <CircleCheckBig className='w-4 h-4 mt-1 mr-2' color='green'/>
                            : <CircleX className='w-4 h-4 mt-1 mr-2' color='red'/>
                          }
                          <h1>Only from {vacancy?.eng_level}</h1>
                        </div>
                        <CardDescription className='ml-6'>Your
                          level: {engLvl.find((item) => item.value === candidate?.eng_level)?.name}</CardDescription>
                      </div>

                      <div>
                        <div className='flex'>
                          {equalCandidateWorkExp
                            ? <CircleCheckBig className='w-4 h-4 mt-1 mr-2' color='green'/>
                            : <CircleX className='w-4 h-4 mt-1 mr-2' color='red'/>
                          }
                          {vacancy?.work_exp === 0 ? 'No experience' :
                            <h1>Only from {vacancy?.work_exp} year of experience </h1>
                          }
                        </div>
                        <CardDescription className='ml-6'>Your experience: {candidate?.work_exp === 0
                          ? 'no experience'
                          : `${candidate?.work_exp} years of experience`}
                        </CardDescription>
                      </div>

                      <div>
                        <div className='flex'>
                          {equalCandidateSalary
                            ? <CircleCheckBig className='w-4 h-4 mt-1 mr-2' color='green'/>
                            : <CircleX className='w-4 h-4 mt-1 mr-2' color='red'/>
                          }
                          <h1>Only ${vacancy?.salary}</h1>
                        </div>
                        <CardDescription className='ml-6'>
                          Your expectations: ${candidate?.salary_expectation}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <Separator className='mb-4'/>

                    <CardContent className='pt-2'>
                      <div className='flex'>
                        <FolderClosed className='w-4 h-4 mt-0.5 mr-2'/>
                        <CardDescription>{vacancy?.category}</CardDescription>
                      </div>
                    </CardContent>

                    <Separator className='mb-4'/>

                    <CardContent className='pt-2 space-y-2'>
                      <div className='flex'>
                        <Laptop className='w-4 h-4 mt-0.5 mr-2'/>
                        <CardDescription>
                          {(vacancy?.employ_options.length || 0) > 0
                            ? vacancy?.employ_options.join(', ')
                            : 'No employ options'
                          }
                        </CardDescription>
                      </div>

                      <div className='flex'>
                        <MapPin className='w-4 h-4 mt-0.5 mr-2'/>
                        <CardDescription>{vacancy?.country}</CardDescription>
                      </div>

                      {vacancy?.is_only_ukraine &&
                        <div className='flex'>
                          <Image src={UA} className='w-4 h-4 mt-0.5 mr-2' alt='UA'/>
                          <CardDescription>Only in Ukraine</CardDescription>
                        </div>
                      }

                      {vacancy?.is_test_task &&
                        <div className='flex'>
                          <ClipboardList className='w-4 h-4 mt-0.5 mr-2'/>
                          <CardDescription>Test task is needed</CardDescription>
                        </div>
                      }

                    </CardContent>

                    <Separator className='mb-4'/>

                    {(vacancy?.skills.length || 0) > 0 &&
                      <CardContent className='pt-2 space-y-1'>
                        <CardDescription><strong>Skills:</strong></CardDescription>
                        <CardDescription>{vacancy?.skills.join(', ')}</CardDescription>
                      </CardContent>
                    }
                  </Card>
                  {!isOpenFeedback &&
                    <Button
                      className='w-full mt-6 dark:text-gray-200'
                      onClick={() => setIsOpenFeedback(!isOpenFeedback)}
                      disabled={!isCandidate}
                    >
                      Apply for the job
                    </Button>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}