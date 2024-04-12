"use client";
import JobCard from "@/components/jobs/JobCard";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useListVacanciesQuery} from "@/lib/features/vacancies/vacancyPublicApiSlice";
import {Separator} from "@/components/ui/separator";
import Spinner from "@/components/general/Spinner";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";


export default function Jobs() {
  const {data: vacancies, isLoading, isFetching} = useListVacanciesQuery()

  if (isLoading || isFetching) return <Spinner size={200}/>

  return (
    <>
      <div className='pt-10 pb-7 md:px-16 px-5'>
        <div className="text-white min-h-screen">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 ml-2">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Jobs at Djinni {vacancies?.count}</h1>
            </div>
            <Separator/>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="col-span-2 space-y-6">
                {vacancies?.count !== 0 ? vacancies?.results.map((vacancy) => (
                  <JobCard key={vacancy.id} vacancy={vacancy}/>
                )) : (
                  <h1>No Vacancies</h1>
                )}
                <Pagination className='flex relative items-center justify-center'>
                  <PaginationContent>
                    <PaginationItem className='absolute left-0'>
                      <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem className='absolute right-0'>
                      <PaginationNext href="#"/>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

              </div>
              <div className='invisible lg:visible'>
                <Card>
                  <CardHeader>
                    <CardTitle>Filter Jobs</CardTitle>
                    <CardDescription>
                      Python, від $1000, 2 роки досвіду, Relocate, Віддалена робота, Офіс, Part-time, Фріланс -
                      Редагувати
                      профіль
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Підписки - На email</p>
                    <p>У вас поки що немає підписок</p>
                    <Button variant="outline">Створити підписку</Button>
                    <p>Мої відгуки на вакансії</p>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}