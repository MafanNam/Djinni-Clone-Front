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
import {CompanyCreateForm} from "@/components/forms/company-create-form";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Breadcrumb className=''>
        <BreadcrumbList className='text-xl'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.push("/my/about-us")}>About Us</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Create Company</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <CompanyCreateForm/>
      </div>
    </>
  )
}