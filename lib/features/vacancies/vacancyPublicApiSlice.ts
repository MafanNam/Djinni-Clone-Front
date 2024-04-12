import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Tag} from "@/components/ui/tag-input";
import {BaseApi} from "@/utils/Interface";
import {Vacancies} from "@/lib/features/accounts/accountsApiSlice";




const otherApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listVacancies: builder.query<Vacancies, void>({
      query: () => '/vacancies/',
    }),
  })
})


export const {
  useListVacanciesQuery,
} = otherApiSlice