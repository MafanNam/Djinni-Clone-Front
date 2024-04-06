"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Logo from "@/public/images/ua.svg"
import {ModeToggle} from "@/components/general/ModeToggle";

import ProfileDropdownMenu from "@/components/ui/ProfileDropdownMenu";
import {useAppSelector} from "@/lib/hooks";


export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false)
  const {user, isAuthenticated} = useAppSelector(state => state.auth)
  // const {data: user, isLoading} = useRetrieveUserQuery()
  const pathname = usePathname()

  // if (isLoading) return <Spinner size={50}/>

  return (
    <nav
      className="sticky top-0 bg-white border-gray-200 bg-opacity-50 backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-50 dark:backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Djinni Clone</span>
          <Image width={30} height={30} src={Logo} className="" alt="Flowbite Logo"/>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <div className='mr-3'>
            <ModeToggle/>
          </div>

          {/*Dropdown menu*/}
          {isAuthenticated
            ? <ProfileDropdownMenu/>
            : (
              <div className='space-x-2'>
                <Link href='/login'
                      className={`navbar-link ${pathname === '/login' ? 'text-blue-700 dark:text-blue-500' : undefined}`}>
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
            className="flex flex-col font-medium text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 bg-opacity-80 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:bg-opacity-0 dark:bg-gray-900 dark:bg-opacity-0 dark:backdrop-blur-md dark:border-gray-700">
            <li>
              <Link href="/inbox"
                    className={`${pathname === '/inbox' ? 'text-blue-700 dark:text-blue-500' : undefined} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                Inbox
              </Link>
            </li>
            <li>
              <Link href="/jobs"
                    className={`${pathname === '/jobs' ? 'text-blue-700 dark:text-blue-500' : undefined} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                Jobs
              </Link>
            </li>
            {user?.type_profile == 'Recruiter' &&
              <li>
                <Link href="/candidates"
                      className={`${pathname === '/candidates' ? 'text-blue-700 dark:text-blue-500' : undefined} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                  Candidates
                </Link>
              </li>
            }
            <li>
              <Link href="/salaries"
                    className={`${pathname === '/salaries' ? 'text-blue-700 dark:text-blue-500' : undefined} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                Salaries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )


  // return (
  //   <nav
  //     className={`flex items-center justify-between gap-10 lg:px-16 pl-4 pr-7 z-[999] py-3 bg-white dark:bg-gray-950 sticky top-0 shadow-sm bg-opacity-75 dark:bg-opacity-50 ${!openSidebar ? 'backdrop-blur-sm dark:backdrop-blur-sm' : ''}`}>
  //     <div onClick={() => router.push('/')} className='flex items-center cursor-pointer'>
  //       <h1 className='text-xl mr-0.5'>Djinni Clone</h1>
  //       <Image src={Logo} width={25} height={25} alt='Djinni Clone'/>
  //     </div>
  //     <div onClick={() => setOpenSidebar(true)} className='lg:hidden block'>
  //       <GiHamburgerMenu className='text-xl cursor-pointer'/>
  //     </div>
  //     <div ref={sidebarRef}
  //          className={`lg:static fixed top-0 ${openSidebar ? 'right-0' : '-right-[3000px] backdrop-filter-none'} transition-all bottom-0 lg:shadow-none shadow-xl lg:w-auto w-[200px] lg:p-0 p-7 lg:flex lg:flex-1 bg-opacity-75 backdrop-blur-3xl`}>
  //       <AiOutlineClose onClick={() => setOpenSidebar(false)}
  //                       className='float-right text-xl mb-5 lg:hidden cursor-pointer'/>
  //       <div className='clear-both'/>
  //       <div className='flex-1 lg:flex-row flex-col flex lg:items-center items-start text-sm lg:gap-7 gap-4'>
  //         {/*<Link href='/' className={`navbar-link ${pathname === '/' || pathname === '/index' ? 'active' : undefined}`}>*/}
  //         {/*  Home*/}
  //         {/*</Link>*/}
  //         <Link href='/inbox' className={`navbar-link ${pathname === '/inbox' ? 'active' : undefined}`}>
  //           Inbox
  //         </Link>
  //         <Link href='/jobs' className={`navbar-link ${pathname === '/jobs' ? 'active' : undefined}`}>
  //           Jobs
  //         </Link>
  //         <Link href='/salaries' className={`navbar-link ${pathname === '/salaries' ? 'active' : undefined}`}>
  //           Salaries
  //         </Link>
  //         {
  //           ((auth.user?.role === 'organization') || (auth.user?.role === 'admin')) &&
  //           <Link href='/find_candidate'
  //                 className={`navbar-link ${pathname === '/find_candidate' ? 'active' : undefined}`}>Find
  //             Candidates</Link>
  //         }
  //       </div>
  //       <div className='text-sm flex lg:flex-row flex-col lg:items-center items-start lg:gap-8 gap-4 mt-10 lg:mt-0'>
  //         {
  //           !auth.accessToken
  //             ? (
  //               <>
  //                 <Link href='/login' className={`navbar-link ${pathname === '/login' ? 'active' : undefined}`}>
  //                   Login
  //                 </Link>
  //                 <Link href='/register'
  //                       className={`px-6 py-2 border-2 rounded-full border-[#504ED7] ${pathname === '/register' || pathname === '/register/jobseeker' || pathname === '/register/organization' ? 'bg-[#504ED7] text-white' : 'text-[#504ED7]'}`}>
  //                   Register Now
  //                 </Link>
  //               </>
  //             )
  //             : (
  //               <>
  //                 {
  //                   auth.user?.role === 'jobseeker'
  //                     ? (
  //                       <>
  //                         <Link href='/edit_profile'
  //                               className={`navbar-link ${pathname === '/edit_profile' ? 'active' : undefined}`}>
  //                           Edit Profile
  //                         </Link>
  //                         <Link href='/received_invitation'
  //                               className={`navbar-link ${pathname === '/received_invitation' ? 'active' : undefined}`}>
  //                           Invitation
  //                         </Link>
  //                         <Link href='/job_applied'
  //                               className={`navbar-link ${pathname === '/job_applied' ? 'active' : undefined}`}>
  //                           Jobs Applied
  //                         </Link>
  //                       </>
  //                     )
  //                     : auth.user?.role === 'organization'
  //                       ? (
  //                         <>
  //                           <Link href='/organization/jobs'
  //                                 className={`navbar-link ${pathname === '/organization/jobs' ? 'active' : undefined}`}>
  //                             Jobs Posted
  //                           </Link>
  //                           <Link href='/sent_invitation'
  //                                 className={`navbar-link ${pathname === '/sent_invitation' ? 'active' : undefined}`}>
  //                             Sent Invitation
  //                           </Link>
  //                         </>
  //                       )
  //                       : (
  //                         <Link href='/organization/approval' className='navbar-link'>
  //                           Dashboard
  //                         </Link>
  //                       )
  //                 }
  //                 <div onClick={handleLogout}>
  //                   <p className='navbar-link cursor-pointer'>Logout</p>
  //                 </div>
  //                 <div>
  //                   <p>Hi, {`<UserName>`}</p>
  //                 </div>
  //               </>
  //             )
  //         }
  //       </div>
  //       <div className='ml-2'>
  //         <ModeToggle/>
  //       </div>
  //     </div>
  //   </nav>
  // )

}