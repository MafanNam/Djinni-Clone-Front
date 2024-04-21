"use client";

import Link from "next/link";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useEffect} from "react";
import {ImGoogle} from "react-icons/im";
import {useAppSelector} from "@/lib/hooks";
import Loader from "@/components/general/Loader";
import {continueWithGoogle} from "@/utils";
import useLoginForm from "@/hooks/useLoginForm";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  } = useLoginForm();


  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect("/my/account");
  }, [isAuthenticated]);


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
          <div className="grid gap-2 mb-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/password-reset" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input type="password" {...register("password")} />
            {errors.password && <span className='text-red-900'>{errors.password.message}</span>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader/> : 'Login'}
          </Button>
          <Button
            variant="outline"
            type='button'
            className="w-full bg-red-200 dark:bg-red-950"
            onClick={continueWithGoogle}
          >
            <ImGoogle className='mr-3'/>Login with Google
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </>
  )
}