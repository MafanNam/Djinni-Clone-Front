"use client";
import CompanyCard from "@/components/home/company/CompanyCard";
import Link from "next/link";
import Spinner from "@/components/general/Spinner";
import {useListCompaniesQuery} from "@/lib/features/other/otherApiSlice";


export default function CompanyContainer() {
  const {data, isLoading, isFetching} = useListCompaniesQuery()


  return (
    <div className='py-20 md:px-16 px-8'>
      <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span
        className='text-[#504ED7]'>Latest</span> Jobs</h1>
      {(isLoading || isFetching) && <Spinner/>}
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {
          data?.results.slice(0, 10).map((item) => (
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
      <Link href='/jobs'
            className='bg-white dark:bg-purple-800 dark:bg-opacity-20 m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>
        Find More Jobs
      </Link>
    </div>
  )


  // return (
  //   <div className='py-20 md:px-16 px-8'>
  //     <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span
  //       className='text-[#504ED7]'>Find</span> Companies</h1>
  //     {isLoading ? <Loader size='xl'/> : (
  //       <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10'>
  //         {
  //           data?.results.map((item: { id: Key | null | undefined; name: any; }) => (
  //             <CompanyCard
  //               id={item.id as string}
  //               key={item.id}
  //               title={item.name}
  //             />
  //           ))
  //         }
  //       </div>
  //     )}
  //     <Link href='/jobs'
  //           className='bg-white m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>
  //       Find More Jobs
  //     </Link>
  //   </div>
  // )
}