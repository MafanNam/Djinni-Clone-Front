import {z} from "zod";
import {isValidPhoneNumber} from "react-phone-number-input/min";
import {ContactCv, useUpdateMeCandidateContactCvMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";


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
  email: z.string().email(),
  phone_number: z
    .string()
    .refine(isValidPhoneNumber, {message: "Invalid phone number"})
    .or(z.literal("")),
  telegram_url: z.string().url().optional().or(z.literal('')),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  git_hub_url: z.string().url().optional().or(z.literal('')),
  portfolio_url: z.string().url().optional().or(z.literal('')),
  cv_file: z.any(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>


export default function useContactCvForm(contactCv: ContactCv | undefined) {
  const [updateCandidateCv, {isLoading: isLoadingUpdate}] = useUpdateMeCandidateContactCvMutation();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    // @ts-ignore
    defaultValues: contactCv,
    mode: "onChange",
  })

  function onSubmit(data: ContactFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('email', data.email)
    formData.append('phone_number', data.phone_number)
    formData.append('telegram_url', String(data.telegram_url))
    formData.append('linkedin_url', String(data.linkedin_url))
    formData.append('git_hub_url', String(data.git_hub_url))
    formData.append('portfolio_url', String(data.portfolio_url))
    console.log(typeof data?.cv_file)
    if (typeof data?.cv_file === "object") {
      formData.append('cv_file', data.cv_file, data.cv_file.name)
    }


    // @ts-ignore
    updateCandidateCv(formData)
      .unwrap()
      .then(() => {
        toast.success('Updated ContactCv')
      })
      .catch(() => {
        toast.error('Failed to update ContactCv')
      });
  }

  return {form, onSubmit, isLoadingUpdate}
}