import {z} from "zod";
import {Candidate, useUpdateMeCandidateMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {Tag} from "@/components/ui/tag-input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {Skills} from "@/lib/features/other/otherApiSlice";


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
  position: z.string(),
  category: z
    .string({required_error: "Category is required"}),
  skills: z.any(),
  work_exp: z.coerce.number()
    .gte(0, 'Must be 0 or above')
    .lte(10, 'Must be less or equal then 10 '),
  work_exp_bio: z.string(),
  salary_expectation: z.coerce.number().gte(1, 'Must be 1 or above'),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string(),
  eng_level: z
    .enum(['none', 'beginner', 'intermediate', 'upper_intermediate', 'advanced']),
  employ_options: z
    .array(z.string()).refine((value) => value.some((item) => item)),
  find_job: z
    .enum(['active', 'passive', 'disabled']),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export default function useProfileForm(candidate: Candidate | undefined, skills: Skills) {
  const [updateCandidate, {isLoading: isLoadingUpdate}] = useUpdateMeCandidateMutation();
  const [tags, setTags] = useState<Tag[]>(
    skills?.results.filter((item) =>
      // @ts-ignore
      candidate?.skills.includes(item.text)));

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // @ts-ignore
    defaultValues: candidate,
    mode: "onChange",
  })


  function onSubmit(data: ProfileFormValues) {
    console.log('Data: ', data)

    // @ts-ignore
    updateCandidate(data)
      .unwrap()
      .then(() => {
        toast.success('Updated Profile')
      })
      .catch(() => {
        toast.error('Failed to update Profile')
      });
  }

  return {form, onSubmit, tags, setTags, isLoadingUpdate}
}