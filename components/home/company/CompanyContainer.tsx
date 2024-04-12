"use client";
import CompanyCard from "@/components/home/company/CompanyCard";
import Link from "next/link";
import {useListCompaniesQuery} from "@/lib/features/other/otherApiSlice";
import {Skeleton} from "@/components/ui/skeleton";


export default function CompanyContainer() {
  const {data, isLoading, isFetching} = useListCompaniesQuery()

  let loader = null;
  if (isLoading || isFetching) {
    loader = (
      <>
        <Skeleton className="h-[215px] w-auto rounded-xl"/>
        <Skeleton className="h-[215px] w-auto rounded-xl"/>
        <Skeleton className="h-[215px] w-auto rounded-xl"/>
      </>
    )
  }

  return (
    <div className='py-20 md:px-16 px-8 bg-gray-50 dark:bg-gray-950'>
      <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span
        className='text-[#504ED7]'>Latest</span> Companies</h1>
      <div
        className='grid xl:items-center xl:justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {loader ||
          data?.results.slice(0, 3).map((item) => (
            <CompanyCard
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
      <Link href='/companies'
            className='bg-white dark:bg-purple-800 dark:bg-opacity-20 m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>
        Find More Companies
      </Link>
    </div>
  )
}