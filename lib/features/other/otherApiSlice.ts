import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Tag} from "@/components/ui/tag-input";
import {BaseApi} from "@/utils/Interface";


export interface Category {
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

export interface Companies extends BaseApi {
  results: Company[];
}

export interface Skills {
  results: Tag[];
}


const otherApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listCategory: builder.query<Category, void>({
      query: () => '/categories/',
    }),
    listCompanies: builder.query<Companies, void>({
      query: () => '/companies/',
    }),
    listSkills: builder.query<Skills, void>({
      query: () => '/skills/',
    }),
  })
})


export const {
  useListCategoryQuery,
  useListCompaniesQuery,
  useListSkillsQuery,
} = otherApiSlice