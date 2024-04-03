"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {FormSubmit} from "@/utils/Interface";
import {AiOutlineSearch} from 'react-icons/ai'
import Image from "next/image";
import HomeJobLogo from '@/public/images/home.job.png';

export default function Jumbotron() {
  const [search, setSearch] = useState('')

  const router = useRouter()

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    router.push(`/jobs?q=${search}`)
  }

  return (
    <div className='pb-20 pt-14 px-10 md:px-0 bg-gradient-to-r from-blue-100 to-pink-300 dark:bg-gradient-to-r dark:from-gray-950 dark:to-gray-950'>
      <h1 style={{lineHeight: '70px'}} className='md:text-5xl text-3xl text-center font-medium mb-7'><span
        className='text-[#504ED7]'>Anonymous Job</span> <br className='hidden md:block'/> search on Djinni</h1>
      <br/>
      <p className='text-gray-600 dark:text-gray-500 text-sm text-center'>{`<NUM VACANCY>`} jobs listed here! Your dream job is waiting</p>
      <div
        className='w-full max-w-[800px] m-auto bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-600 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4 mt-12'>
        <form onSubmit={handleSubmit} className='flex md:flex-row flex-col justify-between items-center h-full gap-3'>
          <div
            className='flex w-full items-center gap-3 md:mb-0 mb-5 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
            <AiOutlineSearch className='text-xl text-gray-500 dark:text-purple-500'/>
            <input type='text' value={search} onChange={e => setSearch(e.target.value)}
                   placeholder='Job title or keyword' className='outline-0 dark:bg-gray-900 h-full px-2 w-full text-sm'/>
          </div>
          <button
            className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search
          </button>
        </form>
      </div>
    </div>
  )
}