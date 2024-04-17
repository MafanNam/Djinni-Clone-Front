"use client";
import {Separator} from "@/components/ui/separator"
import {CompanyForm} from "@/components/forms/company-form";
import {useRetrieveMyCompanyQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useRouter} from "next/navigation";

export default function Page({params}: { params: { id: number } }) {
  const {data: company, isLoading, isFetching} = useRetrieveMyCompanyQuery(params.id)
  const router = useRouter();

  return (
    <div className='flex-1'>
      <Breadcrumb className=''>
        <BreadcrumbList className='text-xl'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.push("/my/about-us")}>About Us</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Company</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        {(isLoading || isFetching) ? <Spinner size={150}/> :
          <CompanyForm company={company}/>
        }
      </div>
    </div>
  )
}