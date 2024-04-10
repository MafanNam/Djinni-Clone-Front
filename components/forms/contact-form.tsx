"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {CaretSortIcon} from "@radix-ui/react-icons"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
  Recruiter,
  useUpdateMeRecruiterMutation,
} from "@/lib/features/accounts/accountsApiSlice";
import Loader from "@/components/general/Loader";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check} from "lucide-react";
import {countries} from "@/utils/constForm";
import {toast} from "react-toastify";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import getImageData from "@/utils/getImage";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import {Companies} from "@/lib/features/other/otherApiSlice";

const contactFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  image: z.any(),
  position: z.string(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  company: z
    .string({required_error: "Company is required"}),
})

type ContactFormValues = z.infer<typeof contactFormSchema>


interface ContactFormProps {
  recruiter?: Recruiter | undefined
  companies?: Companies | undefined
}

export function ContactForm({recruiter, companies}: ContactFormProps) {
  const [updateRecruiter, {isLoading: isLoadingUpdate}] = useUpdateMeRecruiterMutation();
  const [tempImage, setTempImage] = useState(recruiter?.image);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      ...recruiter,
      company: recruiter?.company.name,
    },
    mode: "onChange",
  })

  console.log(recruiter)
  console.log(companies)


  function onSubmit(data: ContactFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('position', data.position)
    formData.append('country', data.country)
    formData.append('company', data.company)
    if (typeof data.image === 'object') {
      formData.append('image', data.image[0], data.image[0].name);
    }

    // @ts-ignore
    updateRecruiter(formData)
      .unwrap()
      .then(() => {
        toast.success('Updated Contact')
      })
      .catch(() => {
        toast.error('Failed to update Contact')
      });
  }

  return (
    <Form {...form}>
      <div className='flex items-center justify-center'>
        <Avatar className="w-36 h-36 static">
          <AvatarImage src={tempImage}/>
          <AvatarFallback>Djinni</AvatarFallback>
        </Avatar>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex items-center justify-center'>
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
        </div>

        <Separator/>

        <FormField
          control={form.control}
          name="first_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Dou" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({field}) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="country"
              render={({field}) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-auto justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? countries.find(
                              (country) => country.value === field.value
                            )?.label
                            : "Select country"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] md:w-[340px] p-0">
                      <Command>
                        <CommandInput placeholder="Search country..."/>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {countries.map((country) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue("country", country.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="company"
              render={({field}) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Company</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-auto justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? companies?.results.find(
                              (company) => company.name === field.value
                            )?.name
                            : "Select company"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] md:w-[340px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..."/>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {companies?.results.map((company) => (
                              <CommandItem
                                value={company.name}
                                key={company.id}
                                onSelect={() => {
                                  form.setValue("company", company.name)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-1 h-4 w-4",
                                    company.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <Avatar>
                                  <AvatarImage src={company.image} className="h-8 w-8 mt-1 opacity-50"/>
                                </Avatar>

                                {company.name}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className='w-full' disabled={isLoadingUpdate}>
          {isLoadingUpdate
            ? <Loader/>
            : 'Update recruiter Contact'
          }
        </Button>
      </form>
    </Form>
  )
}