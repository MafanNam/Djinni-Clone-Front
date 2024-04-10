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
  useLogoutMutation, User,
  useUpdateUserMutation
} from "@/lib/features/auth/authApiSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {FormEvent, useState} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import Loader from "@/components/general/Loader";

const accountFormSchema = z.object({
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

type AccountFormValues = z.infer<typeof accountFormSchema>

interface UserFormProps {
  user?: User;
}

export function AccountForm({user}: UserFormProps) {
  const [updateUser, {isLoading: isLoadingUpdate}] = useUpdateUserMutation();
  const [deleteUser, {isLoading: isLoadingDelete}] = useDeleteUserMutation();
  const [logout,] = useLogoutMutation();
  const [password, setPassword] = useState('')

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: user,
    mode: "onChange",
  })

  function onSubmit(data: AccountFormValues) {
    const {first_name, last_name} = data

    if (user?.first_name === first_name && user?.last_name === last_name) {
      return;
    }
    // @ts-ignore
    updateUser({first_name, last_name})
      .unwrap()
      .then(() => {
        toast.success('Updated Account')
      })
      .catch(() => {
        toast.error('Failed to update Account')
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
          <Button type="submit" className='w-full' disabled={isLoadingUpdate}>
            {isLoadingUpdate
              ? <Loader/>
              : 'Update profile'
            }
          </Button>
        </form>
      </Form>

      <Separator/>

      <div>
        <h3 className="text-lg font-medium">Delete profile</h3>
        <p className="text-sm text-muted-foreground">
          Enter your current password to delete your profile.
        </p>
        <p className="text-sm text-muted-foreground text-red-500">
          WARNING: after deletion, all data will be invalidated. It is impossible to restore.
        </p>
      </div>

      <form onSubmit={handleDelete}>
        <Label>Password</Label>
        <Input className='mt-2' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

        <Button type="submit" variant="destructive" className='mt-8 w-full'
                disabled={isLoadingDelete}>
          {isLoadingDelete
            ? <Loader/>
            : 'Delete profile'
          }
        </Button>
      </form>
    </>
  )
}