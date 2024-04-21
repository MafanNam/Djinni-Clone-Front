import {z} from "zod";
import {useUpdateMyVacancyMutation, Vacancy} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {Tag} from "@/components/ui/tag-input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {Skills} from "@/lib/features/other/otherApiSlice";


export const vacancyFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(100, {
      message: "First name must not be longer than 100 characters.",
    }),
  description: z.string()
    .max(1000, {message: 'Must not be longer than 1000 characters.',}),
  requirements: z.string()
    .max(1000, {message: 'Must not be longer than 1000 characters.',}),
  other: z.string()
    .max(1000, {message: 'Must not be longer than 1000 characters.',}),
  eng_level: z
    .enum(['none', 'beginner', 'intermediate', 'upper_intermediate', 'advanced']),
  salary: z.coerce.number().gte(1, 'Must be 1 or above'),
  category: z
    .string({required_error: "Category is required"}),
  skills: z.any(),
  work_exp: z.coerce.number()
    .gte(0, 'Must be 0 or above')
    .lte(10, 'Must be less or equal then 10 '),
  employ_options: z
    .array(z.string()).refine((value) => value.some((item) => item)),
  country: z.string({
    required_error: "Please select a country.",
  }),
  company: z.any({
    required_error: "Please select a company.",
  }),
  is_only_ukraine: z.boolean(),
  is_test_task: z.boolean(),
})

export type VacancyFormValues = z.infer<typeof vacancyFormSchema>


export default function useVacancyForm(vacancy: Vacancy | undefined, skills: Skills) {
  const [updateVacancy, {isLoading: isLoadingUpdate}] = useUpdateMyVacancyMutation();
  const [tags, setTags] = useState<Tag[]>(
    skills?.results.filter((item) =>
      // @ts-ignore
      vacancy?.skills.includes(item.text)));

  const form = useForm<VacancyFormValues>({
    resolver: zodResolver(vacancyFormSchema),
    // @ts-ignore
    defaultValues: {
      ...vacancy,
      company: vacancy?.company.name
    },
    mode: "onChange",
  })

  console.log(vacancy)


  function onSubmit(data: VacancyFormValues) {
    console.log('Data: ', data)

    // @ts-ignore
    updateVacancy({slug: vacancy?.slug, ...data})
      .unwrap()
      .then(() => {
        toast.success('Updated Vacancy')
      })
      .catch(() => {
        toast.error('Failed to update Vacancy')
      });
  }

  return {form, onSubmit, isLoadingUpdate, tags, setTags}
}