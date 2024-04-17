"use client";
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
import {useRetrieveCompanyQuery} from "@/lib/features/other/otherApiSlice";
import CompanyDetailCard from "@/components/companies/CompanyDetailCard";


export default function Page({params}: { params: { id: number } }) {
  const {data: company, isLoading, isFetching} = useRetrieveCompanyQuery(params.id)

  const router = useRouter();

  let loader = null;
  if (isLoading || isFetching) {
    loader = (
      <div className='bg-gray-900 bg-muted/20 rounded-2xl p-4'>
        <div className='grid gap-2'>
          <div className='flex w-full'>
            <Skeleton className="h-10 w-10 rounded-full"/>
            <Skeleton className="h-8 w-28 rounded-full ml-2 mt-1"/>
          </div>
          <Skeleton className="h-6 w-28 lg:w-72 rounded-2xl ml-2"/>
          <Skeleton className="h-48 w-full rounded-2xl mt-2"/>
        </div>
        <div className='mt-4'>
          <Skeleton className="h-6 w-48 rounded-2xl ml-2"/>
          <Skeleton className="h-6 w-48 rounded-2xl ml-2 mt-4"/>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='pt-10 pb-7 md:px-6 px-5'>
        <div className="text-white min-h-screen">
          <div className="max-w-5xl mx-auto py-4 px-1 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 ml-2">
              <Breadcrumb>
                <BreadcrumbList className='text-l text-black dark:text-white cursor-pointer'>
                  <BreadcrumbItem>
                    <BreadcrumbLink className='hover:text-blue-300'>
                      <h1 onClick={() => router.push("/companies")}>All companies</h1>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator/>
                  <BreadcrumbItem>
                    {isLoading || isFetching ? <Skeleton className="h-6 w-36 rounded-xl"/> :
                      <BreadcrumbPage
                        className='text-blue-500'>{company?.name}</BreadcrumbPage>
                    }
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb></div>
            <Separator/>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="col-span-2 space-y-6">
                {loader || <CompanyDetailCard company={company}/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}