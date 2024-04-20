"use client";

import Link from "next/link"

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ImGoogle} from "react-icons/im";
import {toast} from "react-toastify";
import {useRegisterMutation} from "@/lib/features/auth/authApiSlice";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Loader from "@/components/general/Loader";
import {continueWithGoogle} from "@/utils";


const registerFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 20 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 20 characters.",
    }),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters"
    })
    .max(40, {
      message: "Password must not be longer then 40 characters"
    }),
  re_password: z
    .string(),
}).refine((data) => data.password === data.re_password, {
  path: ["re_password"],
  message: "Passwords don't match",
});

type RegisterFormValue = z.infer<typeof registerFormSchema>


export default function RegisterForm() {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const [typeProfile, setTypeProfile] = useState('candidate')

  const [registerUser, {isLoading}] = useRegisterMutation()
  const router = useRouter()

  function onSubmit(data: RegisterFormValue) {
    registerUser({...data, typeProfile})
      .unwrap()
      .then(() => {

        toast.info("Please check email to verify account.")
        router.push("/login")
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong.")
      })
  }

  console.log(errors)
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