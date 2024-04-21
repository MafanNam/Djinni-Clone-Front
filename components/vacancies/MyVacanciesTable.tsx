import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Eye, ListFilter, MessageCircle, MoreHorizontal, PlusCircle, Search, Users} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {
  Recruiter,
  useDeleteMyVacancyMutation,
  Vacancies
} from "@/lib/features/accounts/accountsApiSlice";
import {toast} from "react-toastify";
import {Checkbox} from "@/components/ui/checkbox";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import * as React from "react";
import {useState} from "react";
import {FormSubmit} from "@/utils/Interface";
import Link from "next/link";


interface Prop {
  vacancies?: Vacancies | undefined;
  recruiter?: Recruiter | undefined;
  loader: any;
  page: number;
  setPage: any;
}

export default function MyVacanciesTable({vacancies, recruiter, loader, page, setPage}: Prop) {
  const pages = Math.floor((vacancies?.count || 0) / 10);

  const [search, setSearch] = useState('')
  const router = useRouter()

  const [vacancyDelete, {isLoading}] = useDeleteMyVacancyMutation();

  console.log(vacancies)

  if (isLoading) return loader;

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    router.push(`/my/vacancies/?search=${search}`)
  }

  function handleDelete(slug: string) {
    alert('Are you sure you want to delete this vacancy?');

    vacancyDelete(slug)
      .unwrap()
      .then(() => {
        toast.success('Deleted Vacancy')
      })
      .catch(() => toast.error('Failed to delete Vacancy'))
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="UA">Ukraine</TabsTrigger>
        </TabsList>
        <div className="relative ml-auto flex-1 md:grow-0">
          <form onSubmit={handleSubmit} className='flex space-x-1'>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[250px]"
            />
            <Button size='sm' type='submit' variant='outline'>Search</Button>
          </form>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5"/>
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuCheckboxItem checked>
                Ukraine
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Created at</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Num employees
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {recruiter?.company ?
            <Button size="sm" className="h-8 gap-1" onClick={() => router.push('/my/vacancies/create')}>
              <PlusCircle className="h-3.5 w-3.5"/>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Vacancy
                  </span>
            </Button> :
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1 bg-red-700 hover:bg-red-600">
                  <PlusCircle className="h-3.5 w-3.5"/>
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Vacancy
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You dont have company in contacts</AlertDialogTitle>
                  <AlertDialogDescription>
                    In order to create vacancies, you must select the company you created in your contacts
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => router.push('/my/contacts')}>Go to contacts</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          }

        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Vacancies</CardTitle>
            <CardDescription>
              Manage your Vacancies and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Work exp
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Salary
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Is only Ukraine
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Is test task
                  </TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Feedback</TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vacancies?.results?.map((vacancy) => (
                  <TableRow key={vacancy.id}>
                    <TableCell className="font-medium">
                      <Link href={`/jobs/${vacancy.slug}`} className='text-blue-500 hover:text-blue-400'>
                      {vacancy.title.slice(0, 30) + ((vacancy.title.length - 30) > 1 ? '...' : '')}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline"
                             className={`${vacancy.country === 'Ukraine' ? 'text-white bg-gradient-to-b from-blue-500 to-yellow-500' : ''}`}>{vacancy.country}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vacancy.work_exp
                        ? (
                          <div className='flex'>
                            <Users className='h-4'/>
                            {vacancy.work_exp}
                          </div>
                        )
                        : 'No work experience'
                      }
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $ {vacancy.salary}
                    </TableCell>
                    <TableCell>
                      {vacancy.company.name}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Checkbox defaultChecked={vacancy.is_only_ukraine} disabled/>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Checkbox defaultChecked={vacancy.is_test_task} disabled/>
                    </TableCell>
                    <TableCell>
                      {vacancy.views
                        ? (
                          <div className='flex'>
                            <MessageCircle className='h-4 mr-1'/>
                            {vacancy.views}
                          </div>
                        )
                        : 'No views'
                      }
                    </TableCell>
                    <TableCell>
                      {vacancy.feedback
                        ? (
                          <div className='flex'>
                            <Eye className='h-4 mr-1'/>
                            {vacancy.feedback}
                          </div>
                        )
                        : 'No feedback'
                      }
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4"/>
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => router.push(`/my/vacancies/${vacancy.slug}/edit`)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(vacancy.slug)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>

            <Pagination className='flex relative items-center justify-center text-black dark:text-white'>
              <PaginationContent>
                <PaginationItem className='absolute left-0'>
                  <PaginationPrevious
                    className={!vacancies?.previous ? "pointer-events-none opacity-50" : undefined}
                    onClick={() => vacancies?.previous && setPage(page - 1)}
                  />
                </PaginationItem>
                {Array.from({length: pages}).slice(0, 5).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setPage(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {pages !== 0 &&
                  <PaginationItem>
                    <PaginationEllipsis/>
                  </PaginationItem>
                }
                <PaginationItem className='absolute right-0'>
                  <PaginationNext
                    className={!vacancies?.next ? "pointer-events-none opacity-50" : undefined}
                    onClick={() => vacancies?.next && setPage(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}