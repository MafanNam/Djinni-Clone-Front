import {CalendarDays, EyeIcon, File, FileX, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  ContactCv, usePostVacancyFeedbackMutation, useUpdateMeCandidateContactCvFileMutation,
  Vacancy
} from "@/lib/features/accounts/accountsApiSlice";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Loader from "@/components/general/Loader";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const updateCvFormSchema = z.object({
  cv_file: z.any(),
})

type UpdateCvFormValues = z.infer<typeof updateCvFormSchema>

interface Props {
  vacancy: Vacancy | undefined;
  contactCv: ContactCv | undefined;
  isCandidate: boolean;
  isOpenFeedback: boolean;
  setIsOpenFeedback: Dispatch<SetStateAction<boolean>>;
}

export default function JobDetailCard({vacancy, contactCv, isCandidate, isOpenFeedback, setIsOpenFeedback}: Props) {
  const [updateCvFile, {isLoading: isLoadingUpdate}] = useUpdateMeCandidateContactCvFileMutation();
  const [createFeedback, {isLoading: isLoadingFeedback}] = usePostVacancyFeedbackMutation();

  const [isUploadCv, setIsUploadCv] = useState(false);
  const [covLetter, setCovLetter] = useState("");
  const router = useRouter();

  const form = useForm<UpdateCvFormValues>({
    resolver: zodResolver(updateCvFormSchema),
    // @ts-ignore
    defaultValues: {cv_file: ''},
    mode: "onChange",
  })

  function handleFeedback() {
    createFeedback({slug: vacancy?.slug, cover_letter: covLetter})
      .unwrap()
      .then(() => {
        setCovLetter("");
        setIsOpenFeedback(false);

        toast.success('Feedback is send')
        router.push(`/inbox`)
      })
      .catch((err) => {
        toast.error(err.data?.message || "Could not send feedback")
      });
  }

  function onSubmitUploadCv(data: UpdateCvFormValues) {
    if (data.cv_file) {
      const formData = new FormData();
      formData.append('cv_file', data.cv_file, data.cv_file.name);

      // @ts-ignore
      updateCvFile(formData)
        .unwrap()
        .then(() => {
          toast.success('Updated Cv')
        })
        .catch(() => {
          toast.error('Failed to update Cv')
        });
    } else {
      toast.warning('Please upload your Cv')
    }
  }

  return (
    <Card
      className='overflow-hidden border-none shadow-none'>
      <CardHeader className='flex flex-row items-start p-5 pb-2'>
        <div>
          <CardTitle>
            {vacancy?.title}
            <span className='text-green-600 opacity-80'>{(vacancy?.salary || 0) >= 1 && ` $${vacancy?.salary}`}</span>
          </CardTitle>
          <CardDescription>
            <span className='flex pt-2'>
            <Avatar className='pt-2'>
              <AvatarImage
                className='rounded-full w-7 h-7'
                src={vacancy?.company.image}
                alt={vacancy?.company.name}
              />
            </Avatar>
            <Link href={`/companies/${vacancy?.company.id}`}
                  className='mt-3 text-blue-600 dark:text-blue-500 hover:text-blue-400'>
              {vacancy?.company.name}
            </Link>
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-4 whitespace-pre-line">
        {vacancy?.description}
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-2">
        <h1><strong>Requirements:</strong></h1>
        <h1 className='whitespace-pre-line'>{vacancy?.requirements}</h1>
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-4">
        <h1><strong>Other</strong></h1>
        <h1 className='whitespace-pre-line'>{vacancy?.other}</h1>
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-2">
        <h1><strong>About {vacancy?.company.name}</strong></h1>
        <h1 className='whitespace-pre-line'>{vacancy?.company.bio}</h1>
      </CardContent>
      <CardContent className="p-4 pt-4 space-y-2">
        <h1><strong>Company website:</strong></h1>
        <Link
          href={vacancy?.company.company_url || ''}
          rel="noopener noreferrer"
          target="_blank"
          className='text-blue-500 hover:text-blue-400'
        >
          {vacancy?.company.company_url}
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-4">
        <div className=" flex items-center space-x-2">
          <CalendarDays className=" text-gray-400"/>
          <span
            className=" text-sm text-gray-400">Job posted on {dayjs(vacancy?.updated_at).format('MMMM D YYYY')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <EyeIcon className=" text-gray-400"/>
          <span className=" text-sm text-gray-400">{vacancy?.views} views</span>
          <Users className=" text-gray-400"/>
          <span className=" text-sm text-gray-400">{vacancy?.feedback} applications</span>
        </div>
      </CardFooter>
      <CardFooter className='p-4'>
        {isOpenFeedback ? (
          <div className='space-y-2 w-full'>
            <CardTitle>Apply for the job</CardTitle>
            <CardDescription>Tell what interests you in this job and why you`d be a good fit. </CardDescription>
            <Textarea
              placeholder='write something'
              className='min-h-[200px]'
              value={covLetter}
              onChange={(e) => setCovLetter(e.target.value)}
            />

            {!isUploadCv ? contactCv?.cv_file ?
                <div className='pt-4'>
                  <h1 className='pb-2 pl-2'><strong>CV:</strong></h1>
                  <Link href={contactCv.cv_file} rel="noopener noreferrer" target="_blank">
                    <Alert className='bg-blue-800 bg-opacity-50'>
                      <File className="h-6 w-6"/>
                      <AlertTitle>
                        {contactCv.cv_file.substring(contactCv.cv_file.lastIndexOf('/') + 1)}
                      </AlertTitle>
                      <AlertDescription>Last
                        modify: {dayjs(contactCv.updated_at).format('D MMMM YYYY HH:MM')}</AlertDescription>
                    </Alert>
                  </Link>
                  <h1
                    className='pt-2 pl-2 text-sm text-blue-500 hover:text-blue-400 cursor-pointer'
                    onClick={() => setIsUploadCv(!isUploadCv)}
                  >
                    + Upload CV
                  </h1>
                </div>
                :
                <div className='pt-4'>
                  <Alert>
                    <FileX className="h-6 w-6"/>
                    <AlertTitle>Not found</AlertTitle>
                    <AlertDescription>Please upload your resume</AlertDescription>
                  </Alert>
                </div>
              :
              <div className='pt-4'>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitUploadCv)} encType='multipart/form-data'
                        className="space-y-8">
                    <FormField
                      control={form.control}
                      name="cv_file"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel className='ml-2'>Cv:</FormLabel>
                          <FormControl>
                            <Alert>
                              <Input
                                {...field}
                                type='file'
                                accept='.pdf'
                                value={field.value?.cv_file}
                                onChange={(e) => {
                                  field.onChange(e.target.files?.[0])
                                }}
                              />
                            </Alert>
                          </FormControl>
                          <FormDescription>
                            Djinni accepts CVs in PDF format only and up to 10MB in size.
                          </FormDescription>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" variant='outline' size='sm' disabled={isLoadingUpdate}>
                      {isLoadingUpdate
                        ? <Loader/>
                        : 'Update contact and cv'
                      }
                    </Button>
                  </form>
                </Form>

              </div>
            }

            <div className='pt-4'>
              <Button
                className='dark:text-gray-200'
                onClick={handleFeedback}
                disabled={!isCandidate || !contactCv?.cv_file || isLoadingFeedback}
              >
                Share contacts and start talking
              </Button>
            </div>

          </div>
        ) : (
          <Button
            className='w-48 dark:text-gray-200'
            onClick={() => setIsOpenFeedback(!isOpenFeedback)}
            disabled={!isCandidate}
          >
            Apply for the job
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}