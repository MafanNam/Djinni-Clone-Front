"use client"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Switch} from "@/components/ui/switch"
import {User} from "@/lib/features/auth/authApiSlice";
import {Checkbox} from "@/components/ui/checkbox";
import Loader from "@/components/general/Loader";
import useNotificationsForm from "@/hooks/useNotificationsForm";


interface Props {
  user?: User | undefined
}

export function NotificationsForm({user}: Props) {
  const {
    isLoadingDelete,
    isLoadingPost,
    form,
    onSubmit,
  } = useNotificationsForm(user)


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem className="space-y-3">
              <FormLabel>Vacancies according to my profile</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      On email:
                    </FormLabel>
                    <FormDescription>{user?.email}</FormDescription>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none"/>
                    </FormControl>
                    <FormLabel className="font-normal">Do not send</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notify_recruiter_emails"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Vacancy
                    </FormLabel>
                    <FormDescription>
                      Notifications from employers and subscriptions to vacancies
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social_emails"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Social emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails for friend requests, follows, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="auto_offers"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Automatic offers from recruiters</FormLabel>
                    <FormDescription>
                      Recruiters can create jobs with automatic offers to candidates who match the job description
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_spam_email"
              render={({field}) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Weekly newsletter
                    </FormLabel>
                    <FormDescription>
                      You agree to receive news and analytics to your email.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className='w-50' disabled={isLoadingDelete || isLoadingPost}>
          {isLoadingPost || isLoadingDelete ? <Loader/> :
            'Update notifications'
          }
        </Button>
      </form>
    </Form>
  )
}