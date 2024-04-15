"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {CaretSortIcon} from "@radix-ui/react-icons"

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
import {
  usePostMyVacancyMutation
} from "@/lib/features/accounts/accountsApiSlice";
import Loader from "@/components/general/Loader";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check} from "lucide-react";
import {countries, employOptions} from "@/utils/constForm";
import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";
import {Tag, TagInput} from "@/components/ui/tag-input";
import {Category, Company, Skills} from "@/lib/features/other/otherApiSlice";
import {Slider} from "@/components/ui/slider";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {toast} from "react-toastify";
import {vacancyFormSchema, VacancyFormValues} from "@/components/forms/vacancy-form";


interface VacancyFormProps {
  skills?: Skills | undefined
  category?: Category | undefined
  myCompanies?: Company[] | undefined
}

export function VacancyCreateForm({skills, category, myCompanies}: VacancyFormProps) {
  const [createVacancy, {isLoading: isLoadingUpdate}] = usePostMyVacancyMutation();

  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<VacancyFormValues>({
    resolver: zodResolver(vacancyFormSchema),

    defaultValues: {
      title: '',
      description: '',
      requirements: '',
      other: '',
      eng_level: 'none',
      salary: 1,
      category: '',
      skills: [],
      work_exp: 0,
      employ_options: [],
      country: '',
      is_only_ukraine: true,
      is_test_task: false,
      company: '',
    },
    mode: "onChange",
  })


  function onSubmit(data: VacancyFormValues) {
    console.log('Data: ', data)

    // @ts-ignore
    createVacancy(data)
      .unwrap()
      .then(() => {
        toast.success('Created Vacancy')
      })
      .catch(() => {
        toast.error('Failed to create Vacancy')
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Vacancy title</FormLabel>
              <FormControl>
                <Input placeholder="Backend dev..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='About vacancy...' className='resize-y min-h-[150px]' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requirements"
          render={({field}) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea placeholder='Requirements vacancy...' className='resize-y min-h-[150px]' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="other"
          render={({field}) => (
            <FormItem>
              <FormLabel>Other</FormLabel>
              <FormControl>
                <Textarea placeholder='Other...' className='resize-y min-h-[150px]' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eng_level"
          render={({field}) => (
            <FormItem className='space-y-3'>
              <FormLabel>English level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      No English
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="beginner"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      Beginner/Elementary
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="intermediate"/>
                    </FormControl>
                    <FormLabel className="font-normal">Intermediate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="upper_intermediate"/>
                    </FormControl>
                    <FormLabel className="font-normal">Upper-Intermediate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advanced"/>
                    </FormControl>
                    <FormLabel className="font-normal">Advanced/Fluent</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({field}) => (
            <FormItem>
              <FormLabel>Salary($)</FormLabel>
              <FormControl>
                <Input type='number' placeholder='$' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Category</FormLabel>
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
                        ? category?.results.find(
                          (category) => category.name === field.value
                        )?.name
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..."/>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {category?.results.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.id}
                            onSelect={() => {
                              form.setValue("category", category.name)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.name}
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
          name="skills"
          render={({field}) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter a your skills"
                  tags={tags}
                  className='sm:min-w-[450px]'
                  shape='rounded'
                  enableAutocomplete={true}
                  autocompleteOptions={skills?.results}
                  setTags={(newTags) => {
                    setTags(newTags);
                    // @ts-ignore
                    form.setValue("skills", newTags?.map((item: Tag) =>
                      item.text.charAt(0).toUpperCase() + item.text.slice(1).toLowerCase()));
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="work_exp"
          render={({field}) => (
            <FormItem>
              <FormLabel>Work experience</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  max={10}
                  step={1}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <h1><span>{field.value == 0 ? 'no work experience' : `${field.value} year`}</span></h1>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employ_options"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Employ options</FormLabel>
              </div>
              {employOptions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="employ_options"
                  render={({field}) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
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
                  <FormLabel>My Company</FormLabel>
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
                            ? myCompanies?.find(
                              (company) => company.name === field.value
                            )?.name
                            : "Select your company"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] md:w-[340px] p-0">
                      <Command>
                        <CommandInput placeholder="Search my company..."/>
                        <CommandEmpty>No company found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {myCompanies?.map((company) => (
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

        <FormField
          control={form.control}
          name="is_only_ukraine"
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
                  Is only Ukraine?
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{" "}

                </FormDescription>
              </div>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_test_task"
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
                  Is test task?
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the
                </FormDescription>
              </div>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={isLoadingUpdate}>
          {isLoadingUpdate
            ? <Loader/>
            : 'Create vacancy'
          }
        </Button>
      </form>
    </Form>
  )
}