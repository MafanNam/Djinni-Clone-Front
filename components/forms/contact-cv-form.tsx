"use client"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {ContactCv} from "@/lib/features/accounts/accountsApiSlice";
import Loader from "@/components/general/Loader";
import {PhoneInput} from "@/components/ui/phone-input";
import {File, FileX} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import dayjs from "dayjs";
import useContactCvForm from "@/hooks/useContactCvForm";


interface ContactFormProps {
  contactCv?: ContactCv | undefined
}

export function ContactCvForm({contactCv}: ContactFormProps) {
  const {
    form,
    onSubmit,
    isLoadingUpdate,
  } = useContactCvForm(contactCv)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-8">

        <FormField
          control={form.control}
          name="first_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Dou" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="simple@gmail.com" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({field}) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter a phone number"
                  defaultCountry='UA'
                  international={true}
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telegram_url"
          render={({field}) => (
            <FormItem>
              <FormLabel>Telegram</FormLabel>
              <FormControl>
                <Input placeholder='url' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin_url"
          render={({field}) => (
            <FormItem>
              <FormLabel>Linkedin</FormLabel>
              <FormControl>
                <Input placeholder='url' {...field} />
              </FormControl>
              {field.value &&
                <FormDescription>
                  Link to your{' '}
                  <Link href={field.value} className='text-blue-500' rel="noopener noreferrer" target="_blank">
                    LinkedIn profile
                  </Link>
                </FormDescription>
              }
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="git_hub_url"
          render={({field}) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder='url' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio_url"
          render={({field}) => (
            <FormItem>
              <FormLabel>Portfolio</FormLabel>
              <FormControl>
                <Input placeholder='url' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Separator/>
        <br/>

        {contactCv?.cv_file ?
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
          : <Alert>
            <FileX className="h-6 w-6"/>
            <AlertTitle>Not found</AlertTitle>
            <AlertDescription>Please upload your resume</AlertDescription>
          </Alert>
        }

        <FormField
          control={form.control}
          name="cv_file"
          render={({field}) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='file'
                  accept='.pdf'
                  value={field.value?.cv_file}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0])
                  }}
                />
              </FormControl>
              <FormDescription>Only .pdf</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button type="submit" className='w-full' disabled={isLoadingUpdate}>
          {isLoadingUpdate
            ? <Loader/>
            : 'Update contact and cv'
          }
        </Button>
      </form>
    </Form>
  )
}