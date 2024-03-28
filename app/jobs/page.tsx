"use client";
import {useState} from "react";
import {FormSubmit, InputChange} from "@/utils/Interface";
import {useRouter} from "next/navigation";
import {AiOutlineSearch} from "react-icons/ai";
import JobCard from "@/components/jobs/JobCard";


export default function Jobs() {
  const [search, setSearch] = useState('')

  const [jobs, setJobs] = useState([
    {id: 1, title: 'Backend'},
    {id: 2, title: 'Frontend'},
  ])



  const handleFilter = (e?: FormSubmit) => {
    e?.preventDefault()
  }


  return (
    <>
      <div className='md:py-10 py-7 md:px-16 px-5'>
        <div className='w-full m-auto bg-white shadow-xl border border-gray-200 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4'>
          <form onSubmit={handleFilter} className='flex md:flex-row flex-col justify-between items-center h-full gap-3'>
            <div className='flex w-full items-center gap-3 md:mb-0 mb-5 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
              <AiOutlineSearch className='text-xl text-gray-500' />
              <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Job title or keyword' className='outline-0 h-full px-2 w-full text-sm' />
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search</button>
          </form>
        </div>
      </div>
      {/*<Filter*/}
      {/*  selectedJobLevel={selectedJobLevel}*/}
      {/*  setSelectedJobLevel={setSelectedJobLevel}*/}
      {/*  selectedEmploymentType={selectedEmploymentType}*/}
      {/*  setSelectedEmploymentType={setSelectedEmploymentType}*/}
      {/*  minSalary={minSalary}*/}
      {/*  setMinSalary={setMinSalary}*/}
      {/*  handleFilter={handleFilter}*/}
      {/*/>*/}
      <div className='bg-gray-100 pt-10 pb-7 md:px-16 px-5'>
        {
          jobs.length === 0
            ? (
              <div className='bg-red-500 text-center text-white rounded-md py-3'>There`s no job available.</div>
            )
            : (
              <div className='grid gap-8 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {
                  jobs.map(item => (
                    <JobCard key={item.id} item={item} />
                  ))
                }
              </div>
            )
        }
      </div>
    </>
  )
}