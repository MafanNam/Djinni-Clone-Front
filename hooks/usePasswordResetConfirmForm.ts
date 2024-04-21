import {z} from "zod";
import {useResetPasswordConfirmMutation} from "@/lib/features/auth/authApiSlice";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {redirect, useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {toast} from "react-toastify";


const passwordResetConfirmFormSchema = z.object({
  new_password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters"
    })
    .max(40, {
      message: "Password must not be longer then 40 characters"
    }),
  re_new_password: z
    .string(),
}).refine((data) => data.new_password === data.re_new_password, {
  path: ["re_new_password"],
  message: "Passwords don't match",
});

type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmFormSchema>


export default function usePasswordResetConfirmForm(uid: string, token: string) {
  const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordResetConfirmFormValues>({
    resolver: zodResolver(passwordResetConfirmFormSchema),
    mode: "onChange",
  });

  const router = useRouter()

  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect("/my/account");
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetConfirmFormValues) {
    const {new_password, re_new_password} = data

    resetPasswordConfirm({uid, token, new_password, re_new_password})
      .unwrap()
      .then(() => {
        router.push('/login')
        toast.success("Request send, check your email")
      })
      .catch(() => {
        toast.error("Failed to send request.")
      })
  }

  return {errors, isLoading, onSubmit, register, handleSubmit}
}