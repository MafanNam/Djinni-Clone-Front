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
  usePostMyCompanyMutation,
  useUpdateMyCompanyMutation,
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
import {Company} from "@/lib/features/other/otherApiSlice";
import {companyFormSchema, CompanyFormValues} from "@/components/forms/company-form";
import {Textarea} from "@/components/ui/textarea";


export function CompanyCreateForm() {
  const [createCompany, {isLoading: isLoadingCreate}] = usePostMyCompanyMutation();
  const [tempImage, setTempImage] = useState();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: '',
      image: '',
      bio: '',
      company_url: '',
      dou_url: '',
      country: '',
      num_employees: 1,
    },
    mode: "onChange",
  })


  function onSubmit(data: CompanyFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('bio', data.bio)
    formData.append('company_url', String(data.company_url))
    formData.append('dou_url', String(data.dou_url))
    formData.append('country', data.country)
    formData.append('num_employees', String(data.num_employees))
    if (typeof data.image === 'object') {
      formData.append('image', data.image[0], data.image[0].name);
    }

    // @ts-ignore
    createCompany(formData)
      .unwrap()
      .then(() => {
        toast.success('Created Company')
      })
      .catch(() => {
        toast.error('Failed to created Company')
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
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="c." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({field}) => (
            <FormItem>
              <FormLabel>Company bio</FormLabel>
              <FormControl>
                <Textarea placeholder='Some about company' className='resize-y min-h-[150px]' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_url"
          render={({field}) => (
            <FormItem>
              <FormLabel>Company url</FormLabel>
              <FormControl>
                <Input placeholder='url' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dou_url"
          render={({field}) => (
            <FormItem>
              <FormLabel>Dou url</FormLabel>
              <FormControl>
                <Input placeholder='url' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
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
                        "w-[200px] justify-between",
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
                <PopoverContent className="w-[190px] p-0">
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
        <FormField
          control={form.control}
          name="num_employees"
          render={({field}) => (
            <FormItem className='w-[150px]'>
              <FormLabel>Num employees</FormLabel>
              <FormControl>
                <Input type='number' placeholder='count employees' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button type="submit" className='w-full' disabled={isLoadingCreate}>
          {isLoadingCreate
            ? <Loader/>
            : 'Create Company'
          }
        </Button>
      </form>
    </Form>
  )
}