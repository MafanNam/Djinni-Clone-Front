"use client";

import Link from "next/link"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ImGoogle} from "react-icons/im";
import Loader from "@/components/general/Loader";
import {continueWithGoogle} from "@/utils";
import useRegisterForm from "@/hooks/useRegisterForm";


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    setTypeProfile,
  } = useRegisterForm()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First name</Label>
              <Input placeholder="Max" {...register('first_name')} />
              {errors.first_name && <span className='text-red-900'>{errors.first_name.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last name</Label>
              <Input placeholder="Robinson" {...register('last_name')} />
              {errors.last_name && <span className='text-red-900'>{errors.last_name.message}</span>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type_profile">Select Type Profile:</Label>
            <RadioGroup defaultValue="candidate" name='type_profile'
                        onValueChange={(value: string) => setTypeProfile(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="candidate" id="r1"/>
                <Label htmlFor="r1">Candidate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="r2"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...register('email')}
            />
            {errors.email && <span className='text-red-900'>{errors.email.message}</span>}

          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" {...register('password')} />
            {errors.password && <span className='text-red-900'>{errors.password.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password Confirm</Label>
            <Input type="password" {...register('re_password')}/>
            {errors.re_password && <span className='text-red-900'>{errors.re_password.message}</span>}
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? <Loader/> : 'Create an account'}
          </Button>
          <Button
            variant="outline"
            type='button'
            className="w-full bg-red-200 dark:bg-red-950"
            onClick={continueWithGoogle}
          >
            <ImGoogle className='mr-3'/>Sign up with Google
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </div>
    </>

  )
}