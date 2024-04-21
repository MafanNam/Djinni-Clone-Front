import {z} from "zod";
import {useDeleteUserMutation, useLogoutMutation, User, useUpdateUserMutation} from "@/lib/features/auth/authApiSlice";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";
import {toast} from "react-toastify";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


export const accountFormSchema = z.object({
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

export type AccountFormValues = z.infer<typeof accountFormSchema>


export default function useAccountForm(user: User | undefined) {
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

  return {onSubmit, handleDelete, isLoadingDelete, isLoadingUpdate, password, setPassword, form}
}