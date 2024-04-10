"use client";
import {Separator} from "@/components/ui/separator"
import {ProfileForm} from "@/components/forms/profile-form";
import {useRetrieveMeCandidateQuery} from "@/lib/features/accounts/accountsApiSlice";
import Spinner from "@/components/general/Spinner";
import {useListCategoryQuery, useListSkillsQuery} from "@/lib/features/other/otherApiSlice";
import ImageForm from "@/components/forms/image-form";

export default function Page() {
  const {data: candidate, isLoading, isFetching} = useRetrieveMeCandidateQuery()
  const {data: skills, isLoading: isLoadingSkills, isFetching: isFetchingSkills} = useListSkillsQuery();
  const {data: category, isLoading: isLoadingCategory, isFetching: isFetchingCategory} = useListCategoryQuery();
  if (isLoading || isFetching || isLoadingSkills || isFetchingSkills || isLoadingCategory || isFetchingCategory) {
    return <Spinner size={150}/>
  }

  window.scrollTo(0, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Job search on Djinni is anonymous.
          Only those to whom you open contacts will see your personal data.
        </p>
      </div>
      <Separator/>
      <div className='flex items-center justify-center'>
        <ImageForm candidate={candidate}/>
      </div>
      <Separator/>
      <ProfileForm candidate={candidate} skills={skills} category={category}/>
    </div>
  )
}