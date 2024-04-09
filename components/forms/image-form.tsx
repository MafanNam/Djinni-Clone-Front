import {
  Candidate,
  useUpdateMeCandidateImageMutation
} from "@/lib/features/accounts/accountsApiSlice";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import getImageData from "@/utils/getImage";
import {Button} from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {toast} from "react-toastify";


const imageFormSchema = z.object({
  image: z.any()
})

type ImageFormValues = z.infer<typeof imageFormSchema>

export default function ImageForm({candidate}: { candidate?: Candidate | undefined }) {
  const [updateImage, {isLoading}] = useUpdateMeCandidateImageMutation();
  const [tempImage, setTempImage] = useState(candidate?.image);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageFormSchema),
    // @ts-ignore
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-8">
        <Avatar className="w-28 h-28 static">
          <AvatarImage src={tempImage}/>
          <AvatarFallback>Djinni</AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='file'
                  accept='image/*'
                  value={field.value?.image}
                  onChange={(e) => {
                    const {files, displayUrl} = getImageData(e)
                    // @ts-ignore
                    setTempImage(displayUrl)
                    // @ts-ignore
                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={isLoading}>
          {isLoading
            ? <Loader/>
            : 'Update candidate image'
          }
        </Button>
      </form>
    </Form>
  )
}