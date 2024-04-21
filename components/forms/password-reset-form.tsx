"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import Loader from "@/components/general/Loader";
import usePasswordResetForm from "@/hooks/usePasswordResetForm";


export default function PasswordResetForm() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    register,
  } = usePasswordResetForm()


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