"use client";
import Link from 'next/link'
import LoginForm from "@/components/forms/login-form";


export default function Login() {

  return (
    <div className='bg-[#FAFAFA] px-10 py-14'>
      <div className='bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12'>
        <h1 className='text-xl text-center mb-7 text-gray-600'>Sign In to Djinni Clone</h1>
        <LoginForm/>
        <p className='text-sm text-gray-500 text-center mt-8'>Don`t have a Djinni Clone account yet?{' '}
          <Link href='/register' className='text-blue-500 outline-0'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}