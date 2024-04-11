"use client";
import Link from "next/link";
import {useListCompaniesQuery} from "@/lib/features/other/otherApiSlice";
import {Skeleton} from "@/components/ui/skeleton";
import VacancyCard from "@/components/home/vacancy/VacancyCard";


export default function VacancyContainer() {
  const {data, isLoading, isFetching} = useListCompaniesQuery()


  return (
    <div className='py-20 md:px-16 px-8'>
      <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span
        className='text-[#504ED7]'>Latest</span> Vacancy</h1>
      <div
        className='grid xl:items-center xl:justify-center xl:flex lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {(isLoading || isFetching) && (
          <>
            <Skeleton className="h-[215px] w-[330px] rounded-l"/>
            <Skeleton className="h-[215px] w-[330px] rounded-l"/>
            <Skeleton className="h-[215px] w-[330px] rounded-l"/>
          </>
        )}
        {
          data?.results.slice(0, 3).map((item) => (
            <VacancyCard
              key={item.id}
              id={item.id}
              name={item.name}
              bio={item.bio}
              country={item.country}
              num_employees={item.num_employees}
              image={item.image}

            />
          ))
        }
      </div>
      <Link href='/jobs'
            className='bg-white dark:bg-purple-800 dark:bg-opacity-20 m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>
        Find More Vacancy
      </Link>
    </div>
  )
}