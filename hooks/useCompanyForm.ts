import {z} from "zod";
import {useUpdateMyCompanyMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {Company} from "@/lib/features/other/otherApiSlice";


export const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters.",
    })
    .max(30, {
      message: "Company name must not be longer than 30 characters.",
    }),
  image: z.any(),
  bio: z.string(),
  company_url: z.string().url().optional().or(z.literal('')),
  dou_url: z.string().url().optional().or(z.literal('')),
  country: z.string({
    required_error: "Please select a country.",
  }),
  num_employees: z.coerce.number().gte(1, 'Must be 1 or above'),
})

export type CompanyFormValues = z.infer<typeof companyFormSchema>


export default function useCompanyForm(company: Company | undefined) {
  const [updateCompany, {isLoading: isLoadingUpdate}] = useUpdateMyCompanyMutation();
  const [tempImage, setTempImage] = useState(company?.image);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: company,
    mode: "onChange",
  })


  function onSubmit(data: CompanyFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    formData.append('id', String(company?.id))
    formData.append('name', data.name)
    formData.append('bio', data.bio)
    formData.append('company_url', String(data.company_url))
    formData.append('dou_url', String(data.dou_url))
    formData.append('country', data.country)
    formData.append('num_employees', String(data.num_employees))
    if (typeof data.image === 'object') {
      formData.append('image', data.image[0], data.image[0].name);
    }

    // @ts-ignore
    updateCompany(formData)
      .unwrap()
      .then(() => {
        toast.success('Updated Company')
      })
      .catch(() => {
        toast.error('Failed to update Company')
      });
  }

  return {form, tempImage, setTempImage, onSubmit, isLoadingUpdate}
}