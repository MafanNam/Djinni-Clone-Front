import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ListFilter, MoreHorizontal, PlusCircle, Search, Users} from "lucide-react";
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
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Companies} from "@/lib/features/other/otherApiSlice";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import {useDeleteMyCompanyMutation} from "@/lib/features/accounts/accountsApiSlice";
import {toast} from "react-toastify";


interface Prop {
  companies?: Companies[] | undefined;
  loader: any;
}

export default function MyCompaniesTable({companies, loader}: Prop) {
  const [companyDelete, {isLoading}] = useDeleteMyCompanyMutation();
  const router = useRouter();

  console.log(companies)

  if (isLoading) return loader;

  function handleDelete(id: number) {
    alert('Are you sure you want to delete this company?');

    companyDelete(id)
      .unwrap()
      .then(() => {
        toast.success('Deleted Company')
      })
      .catch(() => toast.error('Failed to delete Company'))
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[250px]"
          />
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
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-8 gap-1" onClick={() => router.push('/my/about-us/create')}>
            <PlusCircle className="h-3.5 w-3.5"/>
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Company
                  </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Companies</CardTitle>
            <CardDescription>
              Manage your Companies and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Num Employees
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies?.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={company.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={company.image}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline"
                             className={`${company.country === 'Ukraine' ? 'text-white bg-gradient-to-b from-blue-500 to-yellow-500' : ''}`}>{company.country}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {company.num_employees
                        ? (
                          <div className='flex'>
                            <Users className='h-4'/>
                            {company.num_employees}
                          </div>
                        )
                        : 'No employees'
                      }
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {dayjs(company.created_at).format('YYYY-MM-DD HH:mm')}
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
                            onClick={() => router.push(`/my/about-us/${company.id}/edit`)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(company.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Only available create <strong>10</strong> companies
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}