import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Candidate,
} from "@/lib/features/accounts/accountsApiSlice";

// const messageFormSchema = z.object({
//   vacancy: z.any(),
//   message: z.string(),
// })

// type MessageFormValues = z.infer<typeof messageFormSchema>

interface Props {
  candidate: Candidate | undefined;
}

export default function CandidateDetailCard({candidate}: Props) {
  // const form = useForm<MessageFormValues>({
  //   resolver: zodResolver(messageFormSchema),
  //   // @ts-ignore
  //   defaultValues: {message: ''},
  //   mode: "onChange",
  // })

  // function onSubmitMessage() {}

  return (
    <Card
      className='overflow-hidden border-none shadow-none'>
      <CardHeader className='flex flex-row items-start p-5 pb-2'>
        <div>
          <CardTitle>
            {candidate?.first_name} {candidate?.last_name}
            <span className='text-green-600 opacity-80'>
              {(candidate?.salary_expectation || 0) >= 1 && ` $${candidate?.salary_expectation}`}
            </span>
          </CardTitle>
          <CardDescription className='pl-2 pt-3'>
            <span className='flex'>
              {candidate?.work_exp
                ? `${candidate?.work_exp} years of experience`
                : 'No experience'
              }
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 whitespace-pre-line">
        <h1><strong>Work experience:</strong></h1>
        {candidate?.work_exp_bio}
      </CardContent>

      {/*<Form {...form}>*/}
      {/*  <form onSubmit={form.handleSubmit(onSubmitMessage)} encType='multipart/form-data'*/}
      {/*        className="space-y-8">*/}
      {/*    <FormField*/}
      {/*      control={form.control}*/}
      {/*      name="message"*/}
      {/*      render={({field}) => (*/}
      {/*        <FormItem>*/}
      {/*          <FormLabel className='ml-2'>Cv:</FormLabel>*/}
      {/*          <FormControl>*/}
      {/*            <Alert>*/}
      {/*              <Input*/}
      {/*                {...field}*/}
      {/*                type='file'*/}
      {/*                accept='.pdf'*/}
      {/*                value={field.value?.cv_file}*/}
      {/*                onChange={(e) => {*/}
      {/*                  field.onChange(e.target.files?.[0])*/}
      {/*                }}*/}
      {/*              />*/}
      {/*            </Alert>*/}
      {/*          </FormControl>*/}
      {/*          <FormDescription>*/}
      {/*            Djinni accepts CVs in PDF format only and up to 10MB in size.*/}
      {/*          </FormDescription>*/}
      {/*          <FormMessage/>*/}
      {/*        </FormItem>*/}
      {/*      )}*/}
      {/*    />*/}

      {/*    <Button type="submit" variant='outline' size='sm' disabled={isLoadingUpdate}>*/}
      {/*      {isLoadingUpdate*/}
      {/*        ? <Loader/>*/}
      {/*        : 'Update contact and cv'*/}
      {/*      }*/}
      {/*    </Button>*/}
      {/*  </form>*/}
      {/*</Form>*/}
    </Card>
  );
}