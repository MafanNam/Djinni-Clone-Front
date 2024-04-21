import {toast} from "react-toastify";
import {z} from "zod";
import {
  useDeleteIsSpamEmailEveryWeekMutation,
  usePostIsSpamEmailEveryWeekMutation
} from "@/lib/features/accounts/accountsApiSlice";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@/lib/features/auth/authApiSlice";


export const notificationsFormSchema = z.object({
  type: z.enum(["email", "none"], {
    required_error: "You need to select a notification type.",
  }),
  notify_recruiter_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  auto_offers: z.boolean().default(false).optional(),
  is_spam_email: z.boolean().optional(),
})

export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export default function useNotificationsForm(user: User | undefined) {
  const [postSpam, {isLoading: isLoadingPost}] = usePostIsSpamEmailEveryWeekMutation();
  const [deleteSpam, {isLoading: isLoadingDelete}] = useDeleteIsSpamEmailEveryWeekMutation();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      type: user?.is_spam_email ? "email" : "none",
      notify_recruiter_emails: false,
      social_emails: true,
      auto_offers: true,
      is_spam_email: user?.is_spam_email,
    },
  })


  function onSubmit(data: NotificationsFormValues) {
    console.log(data)

    if (data.is_spam_email) {
      postSpam(undefined)
        .unwrap()
        .then(({msg}) => {
          toast.success(msg)
        })
        .catch(() => {
          toast.error('Failed to update notification')
        })
    } else {
      deleteSpam(undefined)
        .unwrap()
        .then(({msg}) => {
          toast.success(msg)
        })
        .catch(() => {
          toast.error('Failed to update notification')
        })
    }
  }

  return {onSubmit, isLoadingDelete, isLoadingPost, form}
}