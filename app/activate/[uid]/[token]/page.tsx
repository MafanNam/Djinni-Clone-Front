"use client";
import {useActivationMutation} from "@/lib/features/auth/authApiSlice";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

interface Props {
  params: {
    uid: string,
    token: string,
  }
}


export default function Page({params}: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation()

  useEffect(() => {
    const {uid, token} = params

    activation({uid, token})
      .unwrap()
      .then(() => {
        toast.success("Account activated.")
      })
      .catch(() => {
        toast.error("Failed to activate account")
      })
      .finally(() => {
        router.push("/login")
      });
  }, [activation, params, router])


  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Activating your account...</h1>
          <p
            className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Please wait. Then you redirect to login page
          </p>
        </div>
      </div>
    </div>
  )
}
