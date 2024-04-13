import {
  Check, CheckCheck,
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
import {Chat, ChatMessages, usePostChatMessagesMutation} from "@/lib/features/inbox/inboxApiSlice";
import {User} from "@/lib/features/auth/authApiSlice";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {toast} from "react-toastify";
import {useState} from "react";


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
  // @ts-ignore
  const [sendMessage, {isLoading}] = usePostChatMessagesMutation(chat.room_id);

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {message: ''},
    mode: "onChange",
  })

  const [newMessage, setNewMessage] = useState('')


  const candidateProfile = user?.type_profile === 'Candidate' ? chat?.candidate : null
  const recruiterProfile = user?.type_profile === 'Recruiter' ? chat?.recruiter : null

  let curProfile;
  let toProfile;
  if (candidateProfile) {
    curProfile = candidateProfile;
    toProfile = chat?.recruiter;
  } else {
    curProfile = recruiterProfile;
    toProfile = chat?.candidate;
  }

  // console.log(curProfile)
  // console.log(chat)

  function onSubmit(data: MessageFormValues) {
    console.log('Data: ', data)

    if (data.message) {
      sendMessage({room_id: chat.room_id, ...data})
        .unwrap()
        .then(() => {
          setNewMessage(data.message)
          form.setValue('message', '')
          toast.success('Sent Message')
        })
        .catch(() => {
          toast.error('Failed to sent Message')
        });
    } else {
      toast.warning('Please write something')
    }
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
              {/*<div className="line-clamp-1 text-xs">*/}
              {/*  <span className="font-medium">Reply-To:</span> {curProfile.email}*/}
              {/*</div>*/}
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
            {messages?.results.map((message) => (
              <div key={message.id}>
                <div className="flex whitespace-pre-wrap p-4 pb-2 text-sm">
                  <Avatar className='h-6 w-6 mr-2'>
                    <AvatarImage alt={message.user?.first_name} src={message.user?.image}/>
                  </Avatar>
                  <span>{message.message}</span>
                </div>
                <div className='relative pb-6'>
                  <div className="flex w-full pl-4 ml-auto text-sm">
                    <h1></h1>
                    <h1 className='ml-auto mr-6'>
                      {message.is_read ? <CheckCheck className='h-4 w-4 text-blue-500'/> : <Check className='h-4 w-4'/>}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
            {newMessage ? (
              <div>
                <div className="flex whitespace-pre-wrap p-4 pb-2 text-sm">
                  <Avatar className='h-6 w-6 mr-2'>
                    <AvatarImage alt={curProfile?.first_name} src={curProfile?.image}/>
                  </Avatar>
                  <span>{newMessage}</span>
                </div>
                <div className='relative pb-6'>
                  <div className="flex w-full pl-4 ml-auto text-sm">
                    <h1></h1>
                    <h1 className='ml-auto mr-6'>
                      <Check className='h-4 w-4'/>
                    </h1>
                  </div>
                </div>
              </div>
            ) : null}

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
                      className="ml-auto"
                      disabled={isLoading}
                    >
                      Send
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