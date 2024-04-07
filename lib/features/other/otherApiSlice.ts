import {apiPublicSlice} from "@/lib/services/apiPublicSlice";


interface Category {
  results: [{
    id: number;
    name: string;
  }]
}


interface Companies {
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


const otherApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    retrieveCategory: builder.query<Category, void>({
      query: () => '/categories/',
    }),
    retrieveCompanies: builder.query<Companies, void>({
      query: () => '/companies/',
    }),
  })
})


export const {
  useRetrieveCategoryQuery,
  useRetrieveCompaniesQuery,
} = otherApiSlice