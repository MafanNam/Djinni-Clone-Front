"use client";
import {Separator} from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useRouter} from "next/navigation";
import {VacancyCreateForm} from "@/components/forms/vacancy-create-form";
import {useListCategoryQuery, useListSkillsQuery} from "@/lib/features/other/otherApiSlice";
import {useListMyCompaniesQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";

export default function Page() {
  const {data: skills, isLoading: isLoadingSkills, isFetching: isFetchingSkills} = useListSkillsQuery();
  const {data: category, isLoading: isLoadingCategory, isFetching: isFetchingCategory} = useListCategoryQuery();
  const {data: myCompanies, isLoading: isLoadingCompanies, isFetching: isFetchingCompanies} = useListMyCompaniesQuery();
  const loading = isLoadingSkills || isFetchingSkills || isLoadingCategory || isFetchingCategory || isLoadingCompanies || isFetchingCompanies;

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
            <BreadcrumbPage>Create Vacancy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <div>
          <h3 className="text-lg font-medium">Create Vacancy</h3>
          <p className="text-sm text-muted-foreground">
            Manage or create vacancy for employment new worker
          </p>
        </div>
        <Separator/>
        {loading ? <Spinner size={150}/> :
          <VacancyCreateForm skills={skills} category={category} myCompanies={myCompanies}/>
        }
      </div>
    </>
  )
}