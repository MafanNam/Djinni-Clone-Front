"use client";
import JobCard from "@/components/jobs/JobCard";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
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


export default function Jobs() {
  const {data: vacancies, isLoading, isFetching} = useListVacanciesQuery()

  let loader = null;
  if (isLoading || isFetching) {
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

  return (
    <>
      <div className='pt-10 pb-7 md:px-16 px-5'>
        <div className="text-white min-h-screen">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 ml-2">
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
                    <Pagination className='flex relative items-center justify-center text-black dark:text-white'>
                      <PaginationContent>
                        <PaginationItem className='absolute left-0'>
                          <PaginationPrevious href="#"/>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationItem className='absolute right-0'>
                          <PaginationNext href="#"/>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>

                  </div>
                  <div className='hidden lg:block'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Filter Jobs</CardTitle>
                        <CardDescription>
                          Python, від $1000, 2 роки досвіду, Relocate, Віддалена робота, Офіс, Part-time, Фріланс -
                          Редагувати
                          профіль
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Підписки - На email</p>
                        <p>У вас поки що немає підписок</p>
                        <Button variant="outline">Створити підписку</Button>
                        <p>Мої відгуки на вакансії</p>
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