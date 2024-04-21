"use client"

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
import Loader from "@/components/general/Loader";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check} from "lucide-react";
import {countries} from "@/utils/constForm";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import getImageData from "@/utils/getImage";
import {Separator} from "@/components/ui/separator";
import {Company} from "@/lib/features/other/otherApiSlice";
import {Textarea} from "@/components/ui/textarea";
import useCompanyForm from "@/hooks/useCompanyForm";


interface CompanyFormProps {
  company?: Company | undefined
}

export function CompanyForm({company}: CompanyFormProps) {
  const {
    form,
    tempImage,
    setTempImage,
    onSubmit,
    isLoadingUpdate,
  } = useCompanyForm(company)

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

                      setTempImage(displayUrl)
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
                <Input placeholder="C." {...field}/>
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

        <Button type="submit" className='w-full' disabled={isLoadingUpdate}>
          {isLoadingUpdate
            ? <Loader/>
            : 'Update Company'
          }
        </Button>
      </form>
    </Form>
  )
}