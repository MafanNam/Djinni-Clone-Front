import {
  Check, CheckCheck, File, FileX, MoreVerticalIcon, Trash
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {Textarea} from "@/components/ui/textarea"
import {format} from "date-fns/format";
import {
  Chat,
  ChatMessages,
  useDeleteChatMessageMutation,
  usePostChatMessagesMutation
} from "@/lib/features/inbox/inboxApiSlice";
import {User} from "@/lib/features/auth/authApiSlice";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {toast} from "react-toastify";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";
import {parsePhoneNumber} from "libphonenumber-js";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import Loader from "@/components/general/Loader";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";


export const messageFormSchema = z.object({
  message: z.string(),
})

export type MessageFormValues = z.infer<typeof messageFormSchema>


interface MailDisplayProps {
  messages?: ChatMessages | null
  chat: Chat
  user?: User | null
}

export function MailDisplay({messages, chat, user}: MailDisplayProps) {
  const [sendMessage, {isLoading}] = usePostChatMessagesMutation();
  const [deleteMessage, {isLoading: isLoadingDeleteMsg}] = useDeleteChatMessageMutation();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {message: ''},
    mode: "onChange",
  })

  const {feedback: {contact_cv}, candidate} = chat

  const candidateProfile = user?.type_profile === 'Candidate' ? chat?.candidate : null

  let toProfile;
  if (candidateProfile) {
    toProfile = chat?.recruiter;
  } else {
    toProfile = chat?.candidate;
  }

  function onSubmit(data: MessageFormValues) {
    console.log('Data: ', data)

    if (data.message) {
      sendMessage({room_id: chat.room_id, ...data})
        .unwrap()
        .then(() => {
          toast.success('Sent Message')
        })
        .catch(() => {
          toast.error('Failed to sent Message')
        });
    } else {
      toast.warning('Please write something')
    }
  }

  function handleDeleteMessage(id: number) {
    deleteMessage({room_id: chat.room_id, id: id})
      .unwrap()
      .then(() => {
        toast.success('Delete Message')
      })
      .catch(() => {
        toast.error('Failed to delete Message')
      });
  }

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage alt={toProfile?.first_name} src={toProfile?.image}/>
              <AvatarFallback>
                {toProfile?.first_name
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{chat?.feedback.vacancy.title}</div>
              <div className="line-clamp-1 text-xs">
                <strong>{candidateProfile ? 'Recruiter' : 'Candidate'}</strong>: {toProfile?.first_name} {toProfile?.last_name}
              </div>
            </div>
          </div>
          {chat?.updated_at && (
            <div className="ml-auto text-xs text-muted-foreground">
              {format(new Date(chat.updated_at), "PPpp")}
            </div>
          )}
        </div>
        <Separator/>
        <div className='grid h-[35rem] md:h-[41rem]'>
          <div className='overflow-y-auto'>

            <Card
              className='overflow-hidden dark:bg-gray-900 dark:bg-opacity-30 m-4'>
              <CardHeader className='flex flex-row items-start p-4 pb-0'>
                <CardTitle className='text-md'>
                  {contact_cv?.first_name} {contact_cv?.last_name}
                </CardTitle>
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="h-8 w-8" size="icon" variant="outline">
                        <MoreVerticalIcon className="h-3.5 w-3.5"/>
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user?.type_profile === 'Recruiter' &&
                        <DropdownMenuItem>More about candidate</DropdownMenuItem>
                      }
                      <DropdownMenuItem>Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {contact_cv?.email &&
                  <CardDescription>
                    <span>{contact_cv?.email}</span>
                  </CardDescription>
                }

                {candidate?.country &&
                  <CardDescription>
                    <span>{candidate?.country} - {candidate?.position}</span>
                  </CardDescription>
                }

                {contact_cv?.phone_number &&
                  <CardDescription>
                    <span>{parsePhoneNumber(contact_cv?.phone_number).formatInternational()}</span>
                  </CardDescription>
                }

                <Separator className='mt-2 mb-2'/>

                {contact_cv?.linkedin_url &&
                  <CardDescription className='space-x-2'>
                    <span>LinkedIn:</span>
                    <Link href={contact_cv?.linkedin_url} className='text-blue-700 hover:text-blue-600'>
                      {contact_cv?.linkedin_url}
                    </Link>
                  </CardDescription>
                }

                {contact_cv?.telegram_url &&
                  <CardDescription className='space-x-2'>
                    <span>Telegram:</span>
                    <Link href={contact_cv?.telegram_url} className='text-blue-700 hover:text-blue-600'>
                      {contact_cv?.telegram_url}
                    </Link>
                  </CardDescription>
                }

                {contact_cv?.git_hub_url &&
                  <CardDescription className='space-x-2'>
                    <span>GitHub:</span>
                    <Link href={contact_cv?.git_hub_url} className='text-blue-700 hover:text-blue-600'>
                      {contact_cv?.git_hub_url}
                    </Link>
                  </CardDescription>
                }

                {contact_cv?.portfolio_url &&
                  <CardDescription className='space-x-2'>
                    <span>Portfolio:</span>
                    <Link href={contact_cv?.portfolio_url} className='text-blue-700 hover:text-blue-600'>
                      {contact_cv?.portfolio_url}
                    </Link>
                  </CardDescription>
                }
              </CardContent>

              <Separator className='mb-3'/>

              <CardFooter className="flex justify-between">
                {contact_cv?.cv_file ?
                  <Link href={contact_cv.cv_file} rel="noopener noreferrer" target="_blank" className='w-full'>
                    <Alert className='bg-blue-800 bg-opacity-50'>
                      <File className="h-6 w-6"/>
                      <AlertTitle>
                        {contact_cv.cv_file.substring(contact_cv.cv_file.lastIndexOf('/') + 1)}
                      </AlertTitle>
                      <AlertDescription>Last
                        modify: {dayjs(contact_cv.updated_at).format('D MMMM YYYY HH:MM')}</AlertDescription>
                    </Alert>
                  </Link>
                  : <Alert>
                    <FileX className="h-6 w-6"/>
                    <AlertTitle>Not found</AlertTitle>
                    <AlertDescription>Please upload your resume</AlertDescription>
                  </Alert>
                }
              </CardFooter>
            </Card>


            {messages?.results.map((message) => (
              <div key={message.id}>
                <div className="flex whitespace-pre-wrap p-4 pb-2 text-sm">
                  <Avatar className='h-6 w-6 mr-2'>
                    <AvatarImage alt={message.user?.first_name} src={message.user?.image}/>
                  </Avatar>
                  <span>{message.message}</span>
                </div>
                <div className='relative pb-4'>
                  <div className="flex w-full pl-4 ml-auto text-sm">
                    <h1></h1>
                    <h1 className='flex ml-auto mr-6 space-x-2'>
                      {message.user.id === user?.id &&
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className="h-5 w-5"
                              size="icon"
                              variant="outline"
                              disabled={isLoadingDeleteMsg}
                            >
                              <Trash className="h-2.5 w-2.5 text-red-700"/>
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your message.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteMessage(message.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      }
                      {message.is_read ? <CheckCheck className='h-4 w-4 text-blue-500'/> : <Check className='h-4 w-4'/>}
                    </h1>
                  </div>
                </div>
                <Separator className='ml-2 mr-2'/>
              </div>
            ))}

          </div>
          <div className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <Separator className="mt-auto"/>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="p-4"
                            disabled={isLoading}
                            placeholder={`Reply ${toProfile?.first_name}...`}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center">
                    <Button
                      type='submit'
                      size="sm"
                      className="ml-auto w-16"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader/> : 'Send'}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  )
}