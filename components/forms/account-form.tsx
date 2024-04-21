"use client"

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
import {User} from "@/lib/features/auth/authApiSlice";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import Loader from "@/components/general/Loader";
import useAccountForm from "@/hooks/useAccountForm";

interface UserFormProps {
  user?: User;
}

export function AccountForm({user}: UserFormProps) {
  const {
    isLoadingDelete,
    isLoadingUpdate,
    password,
    form,
    setPassword,
    onSubmit,
    handleDelete,
  } = useAccountForm(user)


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