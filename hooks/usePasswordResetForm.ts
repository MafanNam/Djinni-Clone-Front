import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useResetPasswordMutation} from "@/lib/features/auth/authApiSlice";
import {redirect, useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {toast} from "react-toastify";


const passwordResetFormSchema = z.object({
  email: z
    .string()
    .email()
})

type PasswordResetFormValues = z.infer<typeof passwordResetFormSchema>

export default function usePasswordResetForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetFormSchema),
    mode: "onChange",
  });

  const [resetPassword, {isLoading}] = useResetPasswordMutation()

  const router = useRouter()

  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect("/my/account");
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetFormValues) {
    console.log(data)

    resetPassword(data.email)
      .unwrap()
      .then(() => {
        router.push('/login')
        toast.success("Request send, check your email")
      })
      .catch(() => {
        toast.error("Failed to send request.")
      })
  }

  return {handleSubmit, register, onSubmit, errors, isLoading}
}