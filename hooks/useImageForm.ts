import {z} from "zod";
import {Candidate, useUpdateMeCandidateImageMutation} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";


const imageFormSchema = z.object({
  image: z.any()
})

type ImageFormValues = z.infer<typeof imageFormSchema>

export default function useImageForm(candidate: Candidate | undefined) {
  const [updateImage, {isLoading}] = useUpdateMeCandidateImageMutation();
  const [tempImage, setTempImage] = useState(candidate?.image);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: candidate?.image,
    mode: "onChange",
  })

  function onSubmit(data: ImageFormValues) {
    if (data?.image) {
      const formData = new FormData();
      formData.append('image', data.image[0], data.image[0].name);
      // @ts-ignore
      updateImage(formData)
        .unwrap()
        .then(() => {
          toast.success('Updated image')
        })
        .catch(() => {
          toast.error('Failed to update image')
        });
    } else {
      toast.warning('Not Uploaded Image')
    }
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage}
}