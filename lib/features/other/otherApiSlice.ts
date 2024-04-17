import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Tag} from "@/components/ui/tag-input";
import {BaseApi, ListBaseApi} from "@/utils/Interface";


export interface Category extends ListBaseApi {
  results: [{
    id: number;
    name: string;
  }]
}

export interface Company extends BaseApi {
  name: string;
  image: any;
  bio: string;
  company_url: string;
  dou_url: string;
  country: string;
  num_employees: number;
}

export interface Companies extends ListBaseApi {
  results: Company[];
}

export interface Skills extends ListBaseApi {
  results: Tag[];
}


const otherApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listCategory: builder.query<Category, void>({
      query: () => '/categories/',
    }),
    listCompanies: builder.query<Companies, number | void>({
      query: (page = 1) => `/companies/?page=${page}`,
    }),
    retrieveCompany: builder.query<Company, number>({
      query: (id) => `/companies/${id}/`,
    }),
    listSkills: builder.query<Skills, void>({
      query: () => '/skills/',
    }),
  })
})


export const {
  useListCategoryQuery,
  useListCompaniesQuery,
  useRetrieveCompanyQuery,
  useListSkillsQuery,
} = otherApiSlice