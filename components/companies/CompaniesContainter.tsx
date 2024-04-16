"use client";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import * as React from "react";
import CompaniesCard from "@/components/companies/CompaniesCard";
import {useListCompaniesQuery} from "@/lib/features/other/otherApiSlice";


export default function CompaniesContainer() {
  const {data: companies, isLoading, isFetching} = useListCompaniesQuery()

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
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 ml-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Companies {companies?.count}</h1>
          </div>

          <Separator/>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
            <div className="col-span-2 space-y-6">
              {loader || (
                companies?.count !== 0 ? companies?.results.map((company) => (
                  <CompaniesCard key={company.id} company={company}/>
                )) : (
                  <h1>No Companies</h1>
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
          </div>
        </div>
      </div>
    </div>
  )
}