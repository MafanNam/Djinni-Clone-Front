"use client";
import {useListMyVacanciesQuery, useRetrieveMeRecruiterQuery} from "@/lib/features/accounts/accountsApiSlice";
import {Skeleton} from "@/components/ui/skeleton";
import MyVacanciesTable from "@/components/vacancies/MyVacanciesTable";
import {useState} from "react";
import {useSearchParams} from "next/navigation";


export function MyVacanciesContainer() {
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''

  const {data: vacancies, isLoading, isFetching} = useListMyVacanciesQuery({page, search});
  const {data: recruiter, isLoading: isLoadingRecruiter, isFetching: isFetchingRecruiter} = useRetrieveMeRecruiterQuery();

  const loader = (
    <div className='h-96 mt-2 mr-2 ml-2'>
      <div className='flex xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        <Skeleton className="h-10 w-60 rounded-2xl"/>
        <Skeleton className="h-10 w-96 rounded-2xl"/>
        <Skeleton className="h-10 w-32 rounded-2xl"/>
        <Skeleton className="h-10 w-48 rounded-2xl"/>
      </div>
      <div className='space-y-4 mt-10 ml-3'>
        <Skeleton className="h-7 w-48 rounded-2xl"/>
        <Skeleton className="h-4 w-56 sm:w-96 rounded-2xl"/>
      </div>
      <div className='space-y-4 mt-10 ml-3 mr-3'>
        <Skeleton className="h-20 w-full rounded-2xl"/>
        <Skeleton className="h-20 w-full rounded-2xl"/>
      </div>
    </div>
  )

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:py-2 sm:px-2 bg-muted/40 rounded-2xl">
        {(isLoading || isFetching || isLoadingRecruiter || isFetchingRecruiter) ? loader :
          <div className="flex-1 items-start">
            <MyVacanciesTable vacancies={vacancies} recruiter={recruiter} loader={loader} page={page} setPage={setPage}/>
          </div>
        }
      </div>
    </div>
  )
}
