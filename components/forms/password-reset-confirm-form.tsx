"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {redirect, useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {toast} from "react-toastify";
import Loader from "@/components/general/Loader";
import {useResetPasswordConfirmMutation} from "@/lib/features/auth/authApiSlice";

const passwordResetConfirmFormSchema = z.object({
  new_password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters"
    })
    .max(40, {
      message: "Password must not be longer then 40 characters"
    }),
  re_new_password: z
    .string(),
}).refine((data) => data.new_password === data.re_new_password, {
  path: ["re_new_password"],
  message: "Passwords don't match",
});

type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmFormSchema>


interface Props {
  uid: string,
  token: string,
}

export default function PasswordResetConfirmForm({uid, token}: Props) {
  const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordResetConfirmFormValues>({
    resolver: zodResolver(passwordResetConfirmFormSchema),
    mode: "onChange",
  });

  const router = useRouter()

  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect("/my/account");
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetConfirmFormValues) {
    const {new_password, re_new_password} = data

    resetPasswordConfirm({uid, token, new_password, re_new_password})
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
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input type="password" {...register('new_password')} />
            {errors.new_password && <span className='text-red-900'>{errors.new_password.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password Confirm</Label>
            <Input type="password" {...register('re_new_password')}/>
            {errors.re_new_password && <span className='text-red-900'>{errors.re_new_password.message}</span>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader/> : 'Set new password'}
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