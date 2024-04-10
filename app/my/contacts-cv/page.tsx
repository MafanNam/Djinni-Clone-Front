"use client";
import {Separator} from "@/components/ui/separator"
import {ContactCvForm} from "@/components/forms/contact-cv-form";
import {useRetrieveMeCandidateContactCvQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";

export default function Page() {
  const {data: contactCv, isLoading, isFetching} = useRetrieveMeCandidateContactCvQuery();

  if (isLoading || isFetching) {
    return <Spinner size={150} />
  }

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
      <ContactCvForm contactCv={contactCv}/>
    </div>
  )
}