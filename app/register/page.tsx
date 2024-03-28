"use client";
import Link from 'next/link'
import Loader from "@/components/general/Loader";
import Footer from '@/components/general/Footer'
import Navbar from '@/components/general/Navbar'
import {useState} from "react";
import {FormSubmit, InputChange} from "@/utils/Interface";
import {useRouter} from "next/navigation";
import {AiOutlineUser} from "react-icons/ai";
import {BiLock} from "react-icons/bi";


export default function Register() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    type_profile: '',
    password: '',
    re_password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const type_profile = [
    {type: 'candidate', name: 'Candidate'},
    {type: 'recruiter', name: 'Recruiter'}
  ];

  const router = useRouter()

  const handleChange = (e: InputChange) => {
    // const {name, value} = e.target
    // setUserData({...userData, [name]: value})
  }

  const handleChangeInput = (e: InputChange) => {
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
      <div className='bg-white w-full max-w-[600px] border border-gray-300 m-auto px-8 py-12'>
        <h1 className='text-xl text-center mb-7 text-gray-600'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
            <AiOutlineUser className='text-lg text-gray-500'/>
            <input type='text' name='first_name' value={userData.first_name} onChange={handleChange}
                   placeholder='First name'
                   className='outline-0 w-full text-sm'/>
          </div>
          <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
            <AiOutlineUser className='text-lg text-gray-500'/>
            <input type='text' name='last_name' value={userData.last_name} onChange={handleChange}
                   placeholder='Last name'
                   className='outline-0 w-full text-sm'/>
          </div>
          <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
            <div className='flex-1'>
              <label htmlFor='type_profile' className='text-sm'>Type Profile</label>
              <select name='type_profile' value={userData.type_profile} onChange={handleChangeInput} id='type_profile'
                      className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                <option value=''>- Select Type Profile -</option>
                {
                  type_profile.map(item => (
                    <option key={item.type} value={item.type}>{item.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
            <AiOutlineUser className='text-lg text-gray-500' />
            <input type='text' name='email' value={userData.email} onChange={handleChange}
                   placeholder='Email address'
                   className='outline-0 w-full text-sm'/>
          </div>
          <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
            <BiLock className='text-lg text-gray-500' />
            <div className='flex items-center w-full'>
              <input type={showPassword ? 'text' : 'password'} name='password' value={userData.password}
                     onChange={handleChange} placeholder='Password' className='outline-0 w-full text-sm pr-3'/>
              {/*{*/}
              {/*  showPassword*/}
              {/*    ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='cursor-pointer text-gray-500' />*/}
              {/*    : <AiFillEye onClick={() => setShowPassword(true)} className='cursor-pointer text-gray-500' />*/}
              {/*}*/}
            </div>
          </div>
          <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3'>
            <BiLock className='text-lg text-gray-500' />
            <div className='flex items-center w-full'>
              <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation'
                     value={userData.re_password} onChange={handleChange}
                     placeholder='Password confirmation'
                     className='outline-0 w-full text-sm pr-3'/>
              {/*{*/}
              {/*  showPasswordConfirmation*/}
              {/*    ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='cursor-pointer text-gray-500' />*/}
              {/*    : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='cursor-pointer text-gray-500' />*/}
              {/*}*/}
            </div>
          </div>
          <button
            className={`bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} transition-[background] text-sm w-full py-3 text-white rounded-sm mt-7`}>
            SIGN UP
          </button>
        </form>
        <p className='mt-8 text-gray-400 text-sm text-center'>Already have an account?{' '}
          <Link href='/login' className='outline-0 text-blue-500'>Sign in</Link>
        </p>
      </div>
    </div>
  );
}