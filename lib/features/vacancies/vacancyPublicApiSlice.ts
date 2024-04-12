import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Vacancies, Vacancy} from "@/lib/features/accounts/accountsApiSlice";


const otherApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listVacancies: builder.query<Vacancies, void>({
      query: () => '/vacancies/',
    }),
    retrieveVacancy: builder.query<Vacancy, string>({
      query: (slug) => `/vacancies/${slug}`,
    }),
  })
})


export const {
  useListVacanciesQuery,
  useRetrieveVacancyQuery,
} = otherApiSlice