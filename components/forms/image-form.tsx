import {
  Candidate,
} from "@/lib/features/accounts/accountsApiSlice";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import getImageData from "@/utils/getImage";
import {Button} from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import useImageForm from "@/hooks/useImageForm";


export default function ImageForm({candidate}: { candidate?: Candidate | undefined }) {
  const {
    form,
    onSubmit,
    isLoading,
    tempImage,
    setTempImage,
  } = useImageForm(candidate)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-8">
        <Avatar className="w-36 h-36 static ml-10">
          <AvatarImage src={tempImage}/>
          <AvatarFallback>Djinni</AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type='file'
                  accept='image/*'
                  value={field.value?.image}
                  className='w-56'
                  onChange={(e) => {
                    const {files, displayUrl} = getImageData(e)

                    setTempImage(displayUrl)

                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-56' disabled={isLoading}>
          {isLoading
            ? <Loader/>
            : 'Update candidate image'
          }
        </Button>
      </form>
    </Form>
  )
}