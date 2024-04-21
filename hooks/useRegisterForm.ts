import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRegisterMutation} from "@/lib/features/auth/authApiSlice";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

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

export default function useRegisterForm() {
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
    registerUser({...data, "type_profile": typeProfile})
      .unwrap()
      .then(() => {

        toast.info("Please check email to verify account.")
        router.push("/login")
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong.")
      })
  }

  return {register, handleSubmit, errors, isLoading, onSubmit, setTypeProfile}
}