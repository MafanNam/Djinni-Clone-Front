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
import Spinner from "@/components/general/Spinner";
import {toast} from "react-toastify";
import {
  Candidate,
  useUpdateMeCandidateMutation,
} from "@/lib/features/accounts/accountsApiSlice";

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
  position: z
    .string(),
  category: z
    .string(),
  skills: z
    .any(),
  work_exp: z
    .number(),
  work_exp_bio: z
    .string(),
  salary_expectation: z
    .number(),
  country: z
    .string(),
  city: z
    .string(),
  eng_level: z
    .string(),
  employ_options: z
    .any(),
  image: z
    .string(),
  find_job: z
    .string(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>


interface AccountFormProps {
  candidate?: Candidate | undefined
}

export function AccountForm({candidate}: AccountFormProps) {
  const [updateCandidate, {isLoading: isLoadingUpdate}] = useUpdateMeCandidateMutation();


  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    // @ts-ignore
    defaultValues: candidate,
    mode: "onChange",
  })


  function onSubmit(data: AccountFormValues) {
    // const {first_name, last_name} = data
    //
    // // @ts-ignore
    // updateUser({first_name, last_name})
    //   .unwrap()
    //   .then(() => {
    //     toast.success('Updated Profile')
    //   })
    //   .catch(() => {
    //     toast.error('Failed to update Profile')
    //   });
  }

  return (
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
          name="position"
          render={({field}) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({field}) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="work_exp"
          render={({field}) => (
            <FormItem>
              <FormLabel>Work experience</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="work_exp_bio"
          render={({field}) => (
            <FormItem>
              <FormLabel>Work experience bio</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary_expectation"
          render={({field}) => (
            <FormItem>
              <FormLabel>Salary expectation</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({field}) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({field}) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eng_level"
          render={({field}) => (
            <FormItem>
              <FormLabel>English level</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employ_options"
          render={({field}) => (
            <FormItem>
              <FormLabel>Employ options</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="find_job"
          render={({field}) => (
            <FormItem>
              <FormLabel>Find job</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoadingUpdate}>
          {isLoadingUpdate
            ? <Spinner size={20}/>
            : 'Update candidate profile'
          }
        </Button>
      </form>
    </Form>
  )
}