"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import Loader from "@/components/general/Loader";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useResetPasswordMutation} from "@/lib/features/auth/authApiSlice";
import {redirect, useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {toast} from "react-toastify";
import {z} from "zod";


const passwordResetFormSchema = z.object({
  email: z
    .string()
    .email()
})

type PasswordResetFormValues = z.infer<typeof passwordResetFormSchema>


export default function PasswordResetForm() {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetFormSchema),
    mode: "onChange",
  });

  const [resetPassword, {isLoading}] = useResetPasswordMutation()

  const router = useRouter()

  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect("/my/account");
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetFormValues) {
    console.log(data)

    resetPassword(data.email)
      .unwrap()
      .then(() => {
        router.push('/login')
        toast.success("Request send, check your email")
      })
      .catch(() => {
        toast.error("Failed to send request.")
      })
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2 mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && <span className='text-red-900'>{errors.email.message}</span>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader/> : 'Send'}
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Did you remember your password?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  )
}