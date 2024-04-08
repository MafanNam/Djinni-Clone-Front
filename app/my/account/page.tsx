"use client";
import {Separator} from "@/components/ui/separator"
import {AccountForm} from "@/components/forms/account-form";
import {useRetrieveMeCandidateQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";
import {useListSkillsQuery} from "@/lib/features/other/otherApiSlice";

export default function Page() {
  const {data: candidate, isLoading, isFetching} = useRetrieveMeCandidateQuery()
  const {data: skills, isLoading: isLoadingSkills, isFetching: isFetchingSkills} = useListSkillsQuery();
  if (isLoading || isFetching || isLoadingSkills || isFetchingSkills) {
    return <Spinner size={150}/>
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
      <AccountForm candidate={candidate} skills={skills}/>
    </div>
  )
}