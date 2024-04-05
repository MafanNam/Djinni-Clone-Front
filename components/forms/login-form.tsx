import Link from "next/link";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {useLoginMutation, useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React from "react";
import Spinner from "@/components/general/Spinner";
import {ImGoogle} from "react-icons/im";
import {useAppDispatch} from "@/lib/hooks";
import {setAuth} from "@/lib/features/auth/authSlice";
import {toast} from "react-toastify";

const loginFormSchema = z.object({
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
    })
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export default function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const [login, {isLoading}] = useLoginMutation()

  const router = useRouter()
  const dispatch = useAppDispatch()

  function onSubmit(data: LoginFormValues) {
    const {email, password} = data

    login({email, password})
      .unwrap()
      .then(() => {
        dispatch(setAuth())

        router.refresh()
        router.push('my/profile')
        toast.success("Login successfully")
      })
      .catch((err: Error) => {
        toast.error("Failed to log in.")
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

          <Button type="submit" className="w-full">
            {isLoading ? <Spinner size={25}/> : 'Login'}
          </Button>
          <Button variant="outline" type='button' className="w-full bg-red-200 dark:bg-red-950">
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