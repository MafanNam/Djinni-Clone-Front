"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {AiOutlineClose} from "react-icons/ai";
import Loader from "@/components/general/Loader";
import CVModal from "@/components/modal/CVModal";


export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    dob: '',
    cv: '',
    province: '',
    city: '',
    district: '',
    postalCode: 0,
    avatar: '',
    about: ''
  })
  const [jobseeker, setJobseeker] = useState({})
  const [skills, setSkills] = useState<string[]>([])
  const [tempAvatar, setTempAvatar] = useState<File[]>([])
  const [tempCv, setTempCv] = useState<File[]>([])

  const [provinceData, setProvinceData] = useState([])
  const [cityData, setCityData] = useState([])

  const [openCVModal, setOpenCVModal] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { auth} = useAppSelector((state) => state)

  function handleSubmit(e: any) {

  }

  function handleChange(e: any) {

  }

  function handleChangeSkills(e: any) {

  }

  function handleRemoveSkill(e: any) {

  }

  function handleChangeImage(e: any) {

  }

  function handleChangeCv(e: any) {

  }

  return (
    <>
      <div className='md:py-14 py-7 md:px-16 px-8 bg-gray-100'>
        <h1 className='text-3xl text-center mb-9 font-medium'><span className='text-[#504ED7]'>Edit</span> Profile</h1>
        <div className='w-full max-w-[700px] bg-white m-auto shadow-lg border border-gray-200 rounded-md p-6'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='avatar' className='text-sm'>Avatar</label>
              <div className='flex gap-4 mt-3'>
                <div className='w-20 h-20 bg-gray-200 rounded-full shrink-0 shadow-xl border border-gray-300'>
                  <img src={tempAvatar.length > 0 ? URL.createObjectURL(tempAvatar[0]) : userData.avatar} alt={auth?.user?.first_name} className='w-full h-full rounded-full' />
                </div>
                <input type='file' accept='image/*' id='avatar' onChange={handleChangeImage} className='w-full outline-0 border border-gray-300 text-sm h-10 rounded-md px-2' />
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor='name' className='text-sm'>Name</label>
              <input type='text' id='name' name='name' value={userData.name} onChange={handleChange} className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <input type='text' id='email' name='email' value={userData.email} onChange={handleChange} readOnly className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3 bg-gray-100' />
            </div>
            <div className='mb-6'>
              <label htmlFor='dob' className='text-sm'>Date of Birth</label>
              <input type='date' id='dob' name='dob' value={userData.dob} onChange={handleChange} className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6'>
              <div className='flex items-center gap-3'>
                <label htmlFor='cv' className='text-sm'>CV (PDF Format)</label>
                {
                  (tempCv.length > 0 || userData.cv) &&
                  <button type='button' onClick={() => setOpenCVModal(true)} className='bg-red-500 hover:bg-red-600 transition[background] text-white px-2 text-xs py-1 rounded-md'>View CV</button>
                }
              </div>
              <input type='file' accept='.pdf' id='cv' name='cv' onChange={handleChangeCv} className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6 flex md:flex-row flex-col md:items-center md:gap-5 gap-6'>
              <div className='flex-1'>
                <label htmlFor='province' className='text-sm'>Province</label>
                <select name='province' id='province' value={userData.province} onChange={handleChange} className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm'>
                  <option value=''>- Select Province -</option>
                  {/*{*/}
                  {/*  provinceData.map(item => (*/}
                  {/*    <option key={item.id} value={item.id}>{item.nama}</option>*/}
                  {/*  ))*/}
                  {/*}*/}
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='city' className='text-sm'>City</label>
                <select name='city' id='city' value={userData.city} onChange={handleChange} className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm'>
                  <option value=''>- Select City -</option>
                  {/*{*/}
                  {/*  cityData.map(item => (*/}
                  {/*    <option key={item.id} value={item.id}>{item.nama}</option>*/}
                  {/*  ))*/}
                  {/*}*/}
                </select>
              </div>
            </div>
            <div className='mb-6 flex md:flex-row flex-col md:items-center md:gap-5 gap-6'>
              <div className='flex-1'>
                <label htmlFor='district' className='text-sm'>District</label>
                <select name='district' id='district' value={userData.district} onChange={handleChange} className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm'>
                  <option value=''>- Select District -</option>
                  {/*{*/}
                  {/*  districtData.map(item => (*/}
                  {/*    <option value={item.id} key={item.id}>{item.nama}</option>*/}
                  {/*  ))*/}
                  {/*}*/}
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='postalCode' className='text-sm'>Postal Code</label>
                <input type='number' name='postalCode' value={userData.postalCode} onChange={handleChange} id='postalCode' className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm' min={1} />
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor='skills' className='text-sm'>Skills</label>
              <div className='border border-gray-300 mt-3 rounded-md flex items-center px-2 min-h-20 flex-wrap'>
                <div className='flex items-center gap-3 flex-wrap my-2'>
                  {
                    skills.map((item, idx) => (
                      <div key={item} className='rounded-md bg-gray-100 px-3 py-1 flex items-center gap-2 break-words'>
                        <p className='text-sm'>{item}</p>
                        <div className='bg-gray-300 text-gray-600 w-fit rounded-full p-1 cursor-pointer'>
                          <AiOutlineClose onClick={() => handleRemoveSkill(idx)} className='text-xs' />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <input type='text' onKeyUp={e => handleChangeSkills(e)} className='outline-0 text-sm w-full px-2 h-10 flex-1' />
              </div>
            </div>
            <div className='mb-9'>
              <label htmlFor='about' className='text-sm'>About (1 paragraph)</label>
              <textarea id='about' name='about' value={userData.about} onChange={handleChange} className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3 resize-none py-2 h-32' />
            </div>
            <button className={`${auth.isLoading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} transition-[background] text-sm w-full py-3 text-white rounded-sm`}>
              {
                auth.isLoading
                  ? <Loader />
                  : 'Save Changes'
              }
            </button>
          </form>
        </div>
      </div>

      {
        (tempCv.length > 0 || userData.cv) &&
        <CVModal
          openModal={openCVModal}
          setOpenModal={setOpenCVModal}
          file={tempCv.length > 0 ? URL.createObjectURL(tempCv[0]) : userData.cv}
        />
      }
    </>
  )
}