"use client";
import JobCard from "@/components/jobs/JobCard";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useListVacanciesQuery} from "@/lib/features/vacancies/vacancyPublicApiSlice";
import {Separator} from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {Skeleton} from "@/components/ui/skeleton";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import * as React from "react";
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import {FormSubmit} from "@/utils/Interface";
import {useListCategoryQuery, useListSkillsQuery} from "@/lib/features/other/otherApiSlice";
import {ClipboardList, RotateCcw} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import UA from "@/public/images/ua.svg"
import Image from "next/image";


const workExp = [
  {value: 0, title: "No experience"},
  {value: 1, title: "1 year"},
  {value: 2, title: "2 years"},
  {value: 3, title: "3 years"},
  {value: 5, title: "5 years"},
]

const endLvl = [
  {value: 'none', title: "No English"},
  {value: 'beginner', title: "Beginner/Elementary"},
  {value: 'intermediate', title: "Intermediate"},
  {value: 'upper_intermediate', title: "Upper-Intermediate"},
  {value: 'advanced', title: "Advanced/Fluent"},
]

const salaryFrom = [1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500]


export default function Jobs() {
  const [page, setPage] = useState(1)
  const router = useRouter();
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const category__id = searchParams.get('category__id') || ''
  const skills__name = searchParams.get('skills__name') || ''
  const work_exp = searchParams.get('work_exp') || ''
  const salary__lte = searchParams.get('salary__lte') || ''
  const eng_level = searchParams.get('eng_level') || ''
  const is_only_ukraine = searchParams.get('is_only_ukraine') || ''
  const is_test_task = searchParams.get('is_test_task') || ''
  const [searchJobs, setSearchJobs] = useState(search)

  const {data: vacancies, isLoading, isFetching} = useListVacanciesQuery({
    page,
    search,
    category__id,
    skills__name,
    work_exp,
    salary__lte,
    eng_level,
    is_only_ukraine,
    is_test_task,
  })
  const {data: category, isLoading: isLoadingCategory, isFetching: isFetchingCategory} = useListCategoryQuery()
  const {data: skills, isLoading: isLoadingSkills, isFetching: isFetchingSkills} = useListSkillsQuery()
  const pages = Math.floor((vacancies?.count || 0) / 10);

  let loader = null;
  if (isLoading || isFetching || isLoadingCategory || isFetchingCategory || isLoadingSkills || isFetchingSkills) {
    loader = (
      <div>
        {Array.from('1234567890').map((_, index) =>
          <div key={index}>
            <div className='bg-gray-900 bg-muted/30 rounded-2xl p-4'>
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
            <br/>
          </div>
        )}
      </div>
    )
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    router.push(`?search=${searchJobs}`)
  }

  const handleCategoryFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault()

    Number(category__id) === id
      ? router.push(`/jobs`)
      : router.push(`?category__id=${id}`)
  }

  const handleSkillsFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, skillName: string) => {
    e.preventDefault()

    skills__name === skillName
      ? router.push(`/jobs`)
      : router.push(`?skills__name=${skillName}`)
  }

  const handleWorkExpFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, title: number) => {
    e.preventDefault()

    Number(work_exp === '' && -1) === title
      ? router.push(`/jobs`)
      : router.push(`?work_exp=${title}`)
  }

  const handleSalaryFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: number) => {
    e.preventDefault()

    Number(salary__lte) === value
      ? router.push(`/jobs`)
      : router.push(`?salary__lte=${value}`)
  }

  const handleEnglishFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, title: string) => {
    e.preventDefault()
    eng_level === title
      ? router.push(`/jobs`)
      : router.push(`?eng_level=${title}`)
  }

  const handleIsUkrainian = (checked: boolean) => {
    checked
      ? router.push(`?is_only_ukraine=${checked}`)
      : router.push(`/jobs`)
  }

  const handleIsTestTask = (checked: boolean) => {
    checked
      ? router.push(`?is_test_task=${checked}`)
      : router.push(`/jobs`)
  }


  return (
    <>
      <div className='pt-6 pb-7 md:px-16 px-5'>
        <div className="text-white min-h-screen">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4 ml-2">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Jobs at Djinni {vacancies?.count}</h1>
            </div>

            <Tabs defaultValue="all">
              <div className="flex items-center px-4 mb-3 py-2">
                <TabsList>
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    For me
                  </TabsTrigger>
                </TabsList>
              </div>
              <Separator/>

              <TabsContent value="all" className="m-0">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  <div className="col-span-2 space-y-6">
                    {loader || (
                      vacancies?.count !== 0 ? vacancies?.results.map((vacancy) => (
                        <JobCard key={vacancy.id} vacancy={vacancy}/>
                      )) : (
                        <h1>No Vacancies</h1>
                      ))}

                    <Pagination className='flex relative items-center justify-center text-black dark:text-white pt-2'>
                      <PaginationContent>
                        <PaginationItem className='absolute left-0'>
                          <PaginationPrevious
                            className={!vacancies?.previous ? "pointer-events-none opacity-50" : undefined}
                            onClick={() => vacancies?.previous && setPage(page - 1)}
                          />
                        </PaginationItem>
                        {Array.from({length: pages}).slice(0, 5).map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              onClick={() => setPage(index + 1)}
                              isActive={page === index + 1}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {pages !== 0 &&
                          <PaginationItem>
                            <PaginationEllipsis/>
                          </PaginationItem>
                        }
                        <PaginationItem className='absolute right-0'>
                          <PaginationNext
                            className={!vacancies?.next ? "pointer-events-none opacity-50" : undefined}
                            onClick={() => vacancies?.next && setPage(page + 1)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>

                  </div>
                  <div className='hidden lg:block'>
                    <Card>
                      <CardHeader>
                        <div className='flex'>
                          <CardTitle>Filter Jobs</CardTitle>
                          {searchParams.size > 0 &&
                            <Button
                              variant='outline'
                              size='icon'
                              className='ml-auto w-8 h-8'
                              onClick={() => router.push(`/jobs`)}
                            >
                              <RotateCcw className='text-red-700'/>
                            </Button>
                          }
                        </div>
                      </CardHeader>
                      <CardContent className='pl-2'>
                        <form onSubmit={handleSubmit} className='flex space-x-2 pl-2'>
                          <Input
                            type="search"
                            placeholder="Search..."
                            value={searchJobs}
                            onChange={(e) => setSearchJobs(e.target.value)}
                            className="rounded-lg bg-background pl-4"
                          />
                          <Button size='sm' type='submit' variant='outline'
                                  className='bg-blue-400 bg-opacity-50 dark:bg-blue-900 dark:hover:bg-blue-600'>Search</Button>
                        </form>
                      </CardContent>

                      <Separator/>

                      <CardContent className='pt-4 space-x-2 space-y-3'>
                        <span>Category:</span>
                        <br/>
                        {isLoadingCategory || isFetchingCategory ? (
                            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                              {Array.from({length: 20}).map((_, index) => (
                                <Skeleton key={index} className='w-16 h-8 rounded-md'/>
                              ))}
                            </div>
                          ) :
                          category?.results.slice(0, 50).map((item) => (
                            <Button
                              variant={+category__id === item.id ? 'default' : 'outline'}
                              key={item.id}
                              onClick={(e) => handleCategoryFilter(e, item.id)}
                            >
                              {item.name}
                            </Button>
                          ))}
                      </CardContent>

                      <Separator/>

                      <CardContent className='pt-4 space-x-2 space-y-3'>
                        <span>Skills:</span>
                        <br/>
                        {isLoadingSkills || isFetchingSkills ? (
                            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                              {Array.from({length: 20}).map((_, index) => (
                                <Skeleton key={index} className='w-16 h-8 rounded-md'/>
                              ))}
                            </div>
                          ) :
                          skills?.results.slice(0, 50).map((item) => (
                            <Button
                              variant={skills__name === item.text ? 'default' : 'outline'}
                              key={item.id}
                              onClick={(e) => handleSkillsFilter(e, item.text)}
                            >
                              {item.text}
                            </Button>
                          ))}
                      </CardContent>

                      <Separator/>

                      <CardContent className='pt-4 space-x-2 space-y-3'>
                        <span>Work experience:</span>
                        <br/>
                        {workExp.map((item, index) => (
                          <Button
                            variant={+(work_exp === '' && -1) === item.value ? 'default' : 'outline'}
                            key={index}
                            onClick={(e) => handleWorkExpFilter(e, item.value)}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </CardContent>

                      <Separator/>

                      <CardContent className='pt-4 space-x-2 space-y-3'>
                        <span>Salary from:</span>
                        <br/>
                        {salaryFrom.map((item, index) => (
                          <Button
                            variant={+salary__lte === item ? 'default' : 'outline'}
                            key={index}
                            onClick={(e) => handleSalaryFilter(e, item)}
                          >
                            $ {item}
                          </Button>
                        ))}
                      </CardContent>

                      <Separator/>

                      <CardContent className='pt-4 space-x-2 space-y-3'>
                        <span>English:</span>
                        <br/>
                        {endLvl.map((item, index) => (
                          <Button
                            variant={eng_level === item.value ? 'default' : 'outline'}
                            size='sm'
                            key={index}
                            onClick={(e) => handleEnglishFilter(e, item.value)}
                          >
                            {item.title}
                          </Button>
                        ))}
                      </CardContent>

                      <Separator/>

                      <CardContent className='pt-4 pb-3 space-y-3'>
                        <div className="flex items-center">
                          <Switch onCheckedChange={(checked) => handleIsUkrainian(checked)}/>
                          <Label className='flex ml-2'>
                            Ukrainian Product
                            <Image src={UA} height={15} width={15} alt='UA' className='ml-2'/>
                          </Label>
                        </div>
                      </CardContent>
                      <CardContent>
                        <div className="flex items-center">
                          <Switch onCheckedChange={(checked) => handleIsTestTask(checked)}/>
                          <Label className='flex ml-2'>
                            <span>Test task</span>
                            <ClipboardList className='ml-2 h-3.5 w-3.5'/>
                          </Label>
                        </div>
                      </CardContent>

                    </Card>
                  </div>

                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
