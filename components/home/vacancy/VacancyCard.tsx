"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";

// @ts-ignore
export default function VacancyCard({id, name, image, bio, country, num_employees}) {

  const router = useRouter()

  return (
    <div onClick={() => router.push(`/companies/${id}`)}
         className='hover:border-2 border hover:border-[#504ED7] border-gray-200 shadow-md p-5 hover:scale-105 rounded-md transition-[transform] cursor-pointer'>
      <div className='flex items-center gap-2'>
        <div className='w-12 h-12 rounded-full border border-gray-300 dark:border-[#504ED7] shrink-0'>
          <Image src={image} alt={name} width={100} height={100} className='w-full h-full rounded-full object-cover'/>
        </div>
        <div>
          <h1 className='font-medium'>{name}</h1>
          <p className='mt-2 text-xs text-gray-500'>{country}</p>
        </div>
      </div>
      <div className='mb-10 mt-6'>
        {/*<h1 className='font-semibold text-xl'>{name}</h1>*/}
        <div className='mt-3 text-gray-400 text-sm' dangerouslySetInnerHTML={{__html: bio.slice(0, 50) + '...'}}/>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <p className='font-semibold text-xl'>{num_employees}</p>
          <sub className='text-xs text-gray-500 font-medium'>/employers</sub>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className='bg-gray-100 p-7 flex gap-4'>
  //     {/*<div className='w-12 h-12 rounded-md shrink-0'>*/}
  //     {/*  <img src={image} alt={title} />*/}
  //     {/*</div>*/}
  //     <div>
  //       <h2 className='font-medium'>{title}</h2>
  //     </div>
  //   </div>
  // )
}