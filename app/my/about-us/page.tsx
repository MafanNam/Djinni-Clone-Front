"use client";

import {Separator} from "@/components/ui/separator"
import {useListMyCompaniesQuery, useRetrieveMyCompanyQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";

export default function Page() {
  const {data: companies, isLoading, isFetching} = useListMyCompaniesQuery();
  const {data: company, isLoading: isLoadingCompany, isFetching: isFetchingCompany} = useRetrieveMyCompanyQuery();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Contact and CV</h3>
        <p className="text-sm text-muted-foreground">
          Job search on Djinni is anonymous.
          Only those to whom you open contacts will see your personal data.
        </p>
      </div>
      <Separator/>
      {(isLoading || isFetching || isLoadingCompany || isFetchingCompany) ? <Spinner size={250}/> :
        (companies?.results?.length || 0) > 0 ? <></> : <></>
      }
    </div>
  )
}