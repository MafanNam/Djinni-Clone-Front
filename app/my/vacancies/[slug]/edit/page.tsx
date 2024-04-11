"use client";
import {Separator} from "@/components/ui/separator"
import {useListMyCompaniesQuery, useRetrieveMyVacancyQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useRouter} from "next/navigation";
import {VacancyForm} from "@/components/forms/vacancy-form";
import {useListCategoryQuery, useListSkillsQuery} from "@/lib/features/other/otherApiSlice";

export default function Page({params}: { params: { slug: string } }) {
  const {data: vacancy, isLoading, isFetching} = useRetrieveMyVacancyQuery(params.slug)
  const {data: skills, isLoading: isLoadingSkills, isFetching: isFetchingSkills} = useListSkillsQuery();
  const {data: category, isLoading: isLoadingCategory, isFetching: isFetchingCategory} = useListCategoryQuery();
  const {data: myCompanies, isLoading: isLoadingCompanies, isFetching: isFetchingCompanies} = useListMyCompaniesQuery();
  const loading = isLoading || isFetching || isLoadingSkills || isFetchingSkills || isLoadingCategory || isFetchingCategory || isLoadingCompanies || isFetchingCompanies;

  const router = useRouter();

  return (
    <>
      <Breadcrumb className=''>
        <BreadcrumbList className='text-l'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.push("/my/vacancies")}>Vacancies</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Vacancy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <div>
          <h3 className="text-lg font-medium">Vacancies</h3>
          <p className="text-sm text-muted-foreground">
            Manage or create vacancy for employment new worker
          </p>
        </div>
        <Separator/>
        {loading ? <Spinner size={150}/> :
          <VacancyForm vacancy={vacancy} skills={skills} category={category} myCompanies={myCompanies}/>
        }
      </div>
    </>
  )
}