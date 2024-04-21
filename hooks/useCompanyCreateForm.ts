import {usePostMyCompanyMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {companyFormSchema, CompanyFormValues} from "@/hooks/useCompanyForm";


export default function useCompanyCreateForm() {
  const [createCompany, {isLoading: isLoadingCreate}] = usePostMyCompanyMutation();
  const [tempImage, setTempImage] = useState('');

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: '',
      image: '',
      bio: '',
      company_url: '',
      dou_url: '',
      country: '',
      num_employees: 1,
    },
    mode: "onChange",
  })


  function onSubmit(data: CompanyFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
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
    createCompany(formData)
      .unwrap()
      .then(() => {
        toast.success('Created Company')
      })
      .catch(() => {
        toast.error('Failed to created Company')
      });
  }

  return {form, onSubmit, tempImage, setTempImage, isLoadingCreate}
}