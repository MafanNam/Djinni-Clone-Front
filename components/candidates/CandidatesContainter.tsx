"use client";
import {Skeleton} from "@/components/ui/skeleton";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import CandidateCard from "@/components/candidates/CandidatesCard";
import {useListCandidatesQuery} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";


export default function CandidatesContainer() {
  const [page, setPage] = useState(1)
  const {data: candidates, isLoading, isFetching} = useListCandidatesQuery(page)
  const pages = Math.floor((candidates?.count || 0) / 10);


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
    <div className='pt-10 pb-7 md:px-16 px-5'>
      <div className="text-white min-h-screen">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 ml-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Candidates {candidates?.count}</h1>
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
                    candidates?.count !== 0 ? candidates?.results.map((candidate) => (
                      <CandidateCard key={candidate.id} candidate={candidate}/>
                    )) : (
                      <h1>No Candidates</h1>
                    ))}
                  <Pagination className='flex relative items-center justify-center text-black dark:text-white pt-2'>
                    <PaginationContent>
                      <PaginationItem className='absolute left-0'>
                        <PaginationPrevious
                          className={!candidates?.previous ? "pointer-events-none opacity-50" : undefined}
                          onClick={() => candidates?.previous && setPage(page - 1)}
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
                          className={!candidates?.next ? "pointer-events-none opacity-50" : undefined}
                          onClick={() => candidates?.next && setPage(page + 1)}
                        />
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
  )
}