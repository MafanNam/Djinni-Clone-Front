import Link from "next/link";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {useLoginMutation} from "@/lib/features/auth/authApiSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

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

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const [login, {isLoading}] = useLoginMutation()

  function onSubmit(data: LoginFormValues) {
    const { email, password } = data;
    console.log(data);

    login({email, password})
      .unwrap()
      .then(() => {
        toast.success("Login successfully!");
        router.push('/')
      })
      .catch((err) => {
        toast.error("Error occured");
      })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-7'>
        <label htmlFor='email' className='text-sm'>Email</label>
        <input className='w-full outline-0 border border-gray-300 px-2 py-3 text-sm rounded-md mt-3'
               placeholder='me@example.com'
               {...register('email')}
        />
        {errors.email && <span className='text-red-900'>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor='password' className='text-sm'>Password</label>
        <div
          className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
          <input type='password'
                 className='w-full outline-0 text-sm'
                 placeholder='password'
                 {...register('password')}
          />
        </div>
        {errors.password && <span className='text-red-900'>{errors.password.message}</span>}

        <Link href='/forgot_password' className='text-blue-500 text-xs mt-2 float-right outline-0'>
          Forgot password?
        </Link>
        <div className='clear-both'/>
      </div>
      <button type='submit'
              className={`bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} outline-0 transition-[background] w-full text-white py-2 mt-6`}>
        SIGN IN
      </button>
    </form>
  )
}