import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Tag} from "@/components/ui/tag-input";


export interface Category {
  results: [{
    id: number;
    name: string;
  }]
}


export interface Companies {
  results: [{
    id: number;
    name: string;
    image: string;
    bio: string;
    company_url: string;
    dou_url: string;
    country: string;
    num_employees: number;
  }]
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