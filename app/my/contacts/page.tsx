"use client";
import {Separator} from "@/components/ui/separator"
import {ContactForm} from "@/components/forms/contact-form";
import {useRetrieveMeRecruiterQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";
import {useListCompaniesQuery} from "@/lib/features/other/otherApiSlice";

export default function Page() {
  const {data: recruiter, isLoading, isFetching} = useRetrieveMeRecruiterQuery();
  const {data: companies, isLoading: isLoadingCompanies, isFetching: isFetchingCompanies} = useListCompaniesQuery();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Contacts</h3>
        <p className="text-sm text-muted-foreground">
          Job search on Djinni is anonymous.
          Only those to whom you open contacts will see your personal data.
        </p>
      </div>
      <Separator/>
      {(isLoading || isFetching || isLoadingCompanies || isFetchingCompanies) ? <Spinner size={200}/> :
        <ContactForm recruiter={recruiter} companies={companies}/>
      }
    </div>
  )
}