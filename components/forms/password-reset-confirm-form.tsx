"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/general/Loader";
import usePasswordResetConfirmForm from "@/hooks/usePasswordResetConfirmForm";


interface Props {
  uid: string,
  token: string,
}

export default function PasswordResetConfirmForm({uid, token}: Props) {
  const {
    errors,
    isLoading,
    onSubmit,
    register,
    handleSubmit,
  } = usePasswordResetConfirmForm(uid, token)


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