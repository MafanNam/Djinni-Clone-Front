import {usePostMyVacancyMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {Tag} from "@/components/ui/tag-input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {vacancyFormSchema, VacancyFormValues} from "@/hooks/useVacancyForm";


export default function useVacancyCreateForm() {
  const [createVacancy, {isLoading: isLoadingUpdate}] = usePostMyVacancyMutation();

  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<VacancyFormValues>({
    resolver: zodResolver(vacancyFormSchema),

    defaultValues: {
      title: '',
      description: '',
      requirements: '',
      other: '',
      eng_level: 'none',
      salary: 1,
      category: '',
      skills: [],
      work_exp: 0,
      employ_options: [],
      country: '',
      is_only_ukraine: true,
      is_test_task: false,
      company: '',
    },
    mode: "onChange",
  })


  function onSubmit(data: VacancyFormValues) {
    console.log('Data: ', data)

    // @ts-ignore
    createVacancy(data)
      .unwrap()
      .then(() => {
        toast.success('Created Vacancy')
      })
      .catch(() => {
        toast.error('Failed to create Vacancy')
      });
  }

  return {form, onSubmit, isLoadingUpdate, tags, setTags}
}