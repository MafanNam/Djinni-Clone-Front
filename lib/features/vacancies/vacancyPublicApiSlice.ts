import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Vacancies, Vacancy} from "@/lib/features/accounts/accountsApiSlice";


const otherApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listVacancies: builder.query<Vacancies, any | void>({
      query: ({
                page = 1,
                search = '',
                category__id = '',
                skills__name = '',
                work_exp = '',
                salary__lte = '',
                eng_level = '',
                is_only_ukraine = '',
                is_test_task = '',
              }) =>
        `/vacancies/?page=${page}&search=${search}&category__id=${category__id}&skills__name=${skills__name}&work_exp=${work_exp}&salary__lte=${salary__lte}&eng_level=${eng_level}&is_only_ukraine=${is_only_ukraine}&is_test_task=${is_test_task}`,
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