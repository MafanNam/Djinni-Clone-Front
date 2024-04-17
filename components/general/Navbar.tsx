"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Logo from "@/public/images/ua.svg"
import {ModeToggle} from "@/components/general/ModeToggle";

import ProfileDropdownMenu from "@/components/ui/ProfileDropdownMenu";
import {useAppSelector} from "@/lib/hooks";
import {Skeleton} from "@/components/ui/skeleton";


export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false)
  const {user, isAuthenticated, isLoading} = useAppSelector(state => state.auth)
  const pathname = usePathname()

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-gray-200 bg-opacity-30 backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-50 dark:backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Djinni Clone</span>
          <Image width={30} height={30} src={Logo} alt="Flowbite Logo"/>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <div className='mr-3'>
            <ModeToggle/>
          </div>

          {/*Dropdown menu*/}
          {isLoading ? <Skeleton className="h-10 w-10 rounded-full"/> :
            isAuthenticated
              ? <ProfileDropdownMenu/>
              : (
                <div className='space-x-2'>
                  <Link href='/login'
                        className={`navbar-link ${pathname === '/login' ? 'text-blue-700 dark:text-blue-500' : ''}`}>
                    Login
                  </Link>
                  <Link href='/register'
                        className={`px-6 py-2 border-2 rounded-full border-[#504ED7] ${pathname === '/register' ? 'bg-[#504ED7] text-white' : 'text-[#504ED7]'}`}>
                    Register Now
                  </Link>
                </div>
              )
          }

          <button type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={() => setOpenSidebar(!openSidebar)}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div
          className={`${openSidebar ? '' : 'hidden flex-1 ml-5'} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
          <ul
            className="flex flex-col font-medium text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 bg-opacity-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:bg-opacity-0 dark:bg-gray-900 dark:bg-opacity-0 dark:border-gray-700">

            {isLoading ? (
              <div className='space-x-4 flex'>
                <Skeleton className="h-10 w-16"/>
                <Skeleton className="h-10 w-16"/>
                <Skeleton className="h-10 w-16"/>
                <Skeleton className="h-10 w-16"/>
              </div>
            ) : (
              <>
                {isAuthenticated &&
                  <li>
                    <Link href="/inbox"
                          className={`block py-2 px-3 ${pathname == '/inbox' ? 'text-gray-900 dark:text-white bg-blue-700 bg-opacity-20 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>
                      Inbox
                    </Link>
                  </li>
                }
                <li>
                  <Link href="/jobs"
                        className={`block py-2 px-3 ${pathname == '/jobs' ? 'text-gray-900 dark:text-white bg-blue-700 bg-opacity-20 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>
                    Jobs
                  </Link>
                </li>
                {
                  user?.type_profile == 'Recruiter' &&
                  <li>
                    <Link href="/candidates"
                          className={`block py-2 px-3 ${pathname == '/candidates' ? 'text-gray-900 dark:text-white bg-blue-700 bg-opacity-20 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>
                      Candidates
                    </Link>
                  </li>
                }
                <li>
                  <Link href="/salaries"
                        className={`block py-2 px-3 ${pathname == '/salaries' ? 'text-gray-900 dark:text-white bg-blue-700 bg-opacity-20 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>
                    Salaries
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}