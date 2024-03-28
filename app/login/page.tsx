"use client";
import Link from 'next/link'
import Loader from "@/components/general/Loader";
import Footer from '@/components/general/Footer'
import Navbar from '@/components/general/Navbar'
import {useState} from "react";
import {FormSubmit, InputChange} from "@/utils/Interface";


export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: InputChange) => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault()

    // if (!userData.email) {
    //     return dispatch({
    //         type: 'alert/alert',
    //         payload: { error: 'Please provide email to login.' }
    //     })
  }

  return (
    <div className='bg-[#FAFAFA] px-10 py-14'>
      <div className='bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12'>
        <h1 className='text-xl text-center mb-7 text-gray-600'>Sign In to Djinni Clone</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-7'>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input type='text' id='email' name='email' value={userData.email}
                   onChange={handleChange} placeholder='me@example.com'
                   className='w-full outline-0 border border-gray-300 px-2 py-3 text-sm rounded-md mt-3'/>
          </div>
          <div>
            <label htmlFor='password' className='text-sm'>Password</label>
            <div
              className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
              <input type={showPassword ? 'text' : 'password'} id='password' name='password'
                     value={userData.password} onChange={handleChange} placeholder='password'
                     className='w-full outline-0 text-sm'/>
              {/*{*/}
              {/*    showPassword*/}
              {/*        ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />*/}
              {/*        : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />*/}
              {/*}*/}
            </div>
            <Link href='/forgot_password' className='text-blue-500 text-xs mt-2 float-right outline-0'>
              Forgot password?
            </Link>
            <div className='clear-both'/>
          </div>
          <button type='submit'
                  className={`bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} outline-0 transition-[background] w-full text-white py-2 mt-6`}>
            SIGN IN
          </button>
        </form>
        <p className='text-sm text-gray-500 text-center mt-8'>Don`t have a Djinni Clone account yet?{' '}
          <Link href='/register' className='text-blue-500 outline-0'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}