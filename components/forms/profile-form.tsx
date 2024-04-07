"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
  useDeleteUserMutation,
  useLogoutMutation,
  useRetrieveUserQuery,
  useUpdateUserMutation
} from "@/lib/features/auth/authApiSlice";
import Spinner from "@/components/general/Spinner";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {FormEvent, useState} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {logout as setLogout} from "@/lib/features/auth/authSlice";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .readonly()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const {data: user, isLoading, isFetching} = useRetrieveUserQuery()
  const [updateUser, {isLoading: isLoadingUpdate}] = useUpdateUserMutation();
  const [deleteUser, {isLoading: isLoadingDelete}] = useDeleteUserMutation();
  const [logout,] = useLogoutMutation();
  const [password, setPassword] = useState('')

  if (isLoading || isFetching) {
    return <Spinner size={200}/>
  }

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    const {first_name, last_name} = data

    if (user?.first_name === first_name && user?.last_name === last_name) {
      return;
    }
    // @ts-ignore
    updateUser({first_name, last_name})
      .unwrap()
      .then(() => {
        toast.success('Updated Profile')
      })
      .catch(() => {
        toast.error('Failed to update Profile')
      });
  }

  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // @ts-ignore
    deleteUser({current_password: password})
      .unwrap()
      .then(() => {
        toast.success('Deleted Profile')
      })
      .catch(() => toast.error('Failed to delete Profile'))
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .catch()
      .finally(() => {
        router.push("/");
      })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="first_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dou" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} readOnly/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoadingUpdate}>
            {isLoadingUpdate
              ? <Spinner size={20}/>
              : 'Update profile'
            }
          </Button>
        </form>
      </Form>

      <Separator/>

      <form onSubmit={handleDelete}>
        <Label>Password</Label>
        <Input className='mt-2' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

        <Button type="submit" variant="destructive" className='mt-8'
                disabled={isLoadingDelete}>
          {isLoadingDelete
            ? <Spinner size={20}/>
            : 'Delete profile'
          }
        </Button>
      </form>
    </>
  )
}