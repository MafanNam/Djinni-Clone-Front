import CompanyCard from "@/components/home/company/CompanyCard";
import { Key } from "react";
import Link from "next/link";

// @ts-ignore
export default function CompanyContainer({companies}) {
  return (
    <div className='py-20 md:px-16 px-8'>
      <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span
        className='text-[#504ED7]'>Find</span> Companies</h1>
      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {
          companies.map((item: { id: Key | null | undefined; title: any; }) => (
            <CompanyCard
              id={item.id as string}
              key={item.id}
              title={item.title}
            />
          ))
        }
      </div>
      <Link href='/jobs' className='bg-white m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>
        Find More Jobs
      </Link>
    </div>
  )
}