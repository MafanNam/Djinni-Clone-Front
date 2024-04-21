import {z} from "zod";
import {Recruiter, useUpdateMeRecruiterMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {Company} from "@/lib/features/other/otherApiSlice";


const contactFormSchema = z.object({
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
  image: z.any(),
  position: z.string(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  company: z
    .string({required_error: "Company is required"}),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function useContactForm(
  recruiter: Recruiter | undefined, myCompanies: Company[] | undefined
) {
  const [updateRecruiter, {isLoading: isLoadingUpdate}] = useUpdateMeRecruiterMutation();
  const [tempImage, setTempImage] = useState(recruiter?.image);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      ...recruiter,
      company: recruiter?.company?.name,
    },
    mode: "onChange",
  })

  console.log(recruiter)
  console.log(myCompanies)


  function onSubmit(data: ContactFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('position', data.position)
    formData.append('country', data.country)
    formData.append('company', data.company)
    if (typeof data.image === 'object') {
      formData.append('image', data.image[0], data.image[0].name);
    }

    // @ts-ignore
    updateRecruiter(formData)
      .unwrap()
      .then(() => {
        toast.success('Updated Contact')
      })
      .catch(() => {
        toast.error('Failed to update Contact')
      });
  }

  return {form, onSubmit, isLoadingUpdate, tempImage, setTempImage}
}