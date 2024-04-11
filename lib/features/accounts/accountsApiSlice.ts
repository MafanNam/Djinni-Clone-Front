import {apiSlice} from "@/lib/services/apiSlice";
import {BaseApi} from "@/utils/Interface";
import {Companies, Company} from "@/lib/features/other/otherApiSlice";


export interface Candidate extends BaseApi {
  first_name: string;
  last_name: string;
  position: string;
  category: string;
  skills: [];
  work_exp: number;
  work_exp_bio: string;
  salary_expectation: number;
  country: string;
  city: string;
  eng_level: string;
  employ_options: [];
  image: any;
  find_job: string;
}

export interface ContactCv extends BaseApi {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  telegram_url: string;
  linkedin_url: string;
  git_hub_url: string;
  portfolio_url: string;
  cv_file: any;
}

export interface VacancyCreate {
  title: string;
  slug: string;
  description: string;
  requirements: string;
  other: string;
  eng_level: string;
  salary: number;
  category: string;
  skills: [];
  work_exp: number;
  employ_options: [];
  country: string;
  is_only_ukraine: boolean;
  is_test_task: boolean;
}

export interface Vacancy extends BaseApi {
  recruiter: {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    category: string;
    company: string;
    image: any;
    trust_hr: boolean;
  }
  company: {
    id: number;
    name: string;
    image: any;
    country: string;
  }
  title: string;
  slug: string;
  description: string;
  requirements: string;
  other: string;
  eng_level: string;
  salary: number;
  category: string;
  skills: [];
  work_exp: number;
  employ_options: [];
  country: string;
  is_only_ukraine: boolean;
  is_test_task: boolean;
  views: number;
  feedback: number;
}

export interface Vacancies extends BaseApi {
  results: Vacancy[];
}


export interface Recruiter extends BaseApi {
  first_name: string;
  last_name: string;
  position: string;
  category: string;
  company: {
    id: number;
    name: string;
    image: any;
    country: string;
  };
  image: any;
  trust_hr: boolean;
}

interface Candidates {
  result: Candidate[]
}

interface Recruiters {
  result: Recruiter[]
}


const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listCandidates: builder.query<Candidates, void>({
      query: () => '/accounts/candidates/',
    }),
    retrieveCandidate: builder.query<Candidate, void>({
      query: (id) => `/accounts/candidates/${id}/`,
    }),
    retrieveMeCandidate: builder.query<Candidate, void>({
      query: () => '/accounts/candidates/me/',
      keepUnusedDataFor: 5,
      providesTags: ['Candidate'],
    }),
    updateMeCandidate: builder.mutation<Candidate, void>({
      query: (data) => ({
        url: '/accounts/candidates/me/',
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    updateMeCandidateImage: builder.mutation<Candidate, void>({
      query: (data) => ({
        url: '/accounts/candidates/me/image/',
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    retrieveMeCandidateContactCv: builder.query<ContactCv, void>({
      query: () => '/accounts/candidates/me/cv/',
      keepUnusedDataFor: 5,
      providesTags: ['Candidate'],
    }),
    updateMeCandidateContactCv: builder.mutation<ContactCv, void>({
      query: (data) => ({
        url: '/accounts/candidates/me/cv/',
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    listRecruiters: builder.query<Recruiters, void>({
      query: () => '/accounts/recruiters/',
    }),
    retrieveRecruiter: builder.query<Recruiter, void>({
      query: (id) => `/accounts/recruiters/${id}/`,
    }),
    retrieveMeRecruiter: builder.query<Recruiter, void>({
      query: () => '/accounts/recruiters/me/',
      keepUnusedDataFor: 5,
      providesTags: ['Recruiter'],
    }),
    updateMeRecruiter: builder.mutation<Recruiter, void>({
      query: (data) => ({
        url: '/accounts/recruiters/me/',
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Recruiter'],
    }),

    postIsSpamEmailEveryWeek: builder.mutation({
      query: () => ({
        url: 'auth/users/me/spam-email-every-week/',
        method: 'POST',
      })
    }),
    deleteIsSpamEmailEveryWeek: builder.mutation({
      query: () => ({
        url: 'auth/users/me/spam-email-every-week/',
        method: 'DELETE',
      })
    }),


    listMyCompanies: builder.query<Company[], void>({
      query: () => `/companies/my/`,
      providesTags: ['Company', 'Recruiter']
    }),
    postMyCompany: builder.mutation({
      query: (data) => ({
        url: '/companies/my/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Companies']
    }),
    retrieveMyCompany: builder.query<Company, number>({
      query: (id) => `/companies/my/${id}/`,
      providesTags: ['Company', 'Recruiter']
    }),
    updateMyCompany: builder.mutation<Company, Partial<Company>>({
      query: (data) => ({
        // @ts-ignore
        url: `/companies/my/${data.get('id')}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Company', 'Companies'],
    }),
    deleteMyCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/my/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recruiter', 'Companies']
    }),


    listMyVacancies: builder.query<Vacancies, void>({
      query: () => `/vacancies/my/`,
      providesTags: ['Vacancy', 'Recruiter']
    }),
    postMyVacancy: builder.mutation<VacancyCreate, void>({
      query: (data) => ({
        url: '/vacancies/my/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Vacancies']
    }),
    retrieveMyVacancy: builder.query<Vacancy, string>({
      query: (slug) => `/vacancies/my/${slug}/`,
      providesTags: ['Vacancy', 'Recruiter']
    }),
    updateMyVacancy: builder.mutation<VacancyCreate, Partial<VacancyCreate>>({
      query: ({slug, ...data}) => ({
        // @ts-ignore
        url: `/vacancies/my/${slug}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Vacancy', 'Vacancies'],
    }),
    deleteMyVacancy: builder.mutation({
      query: (slug) => ({
        url: `/vacancies/my/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recruiter', 'Vacancies']
    }),


  })
})


export const {
  useListCandidatesQuery,
  useRetrieveCandidateQuery,
  useRetrieveMeCandidateQuery,
  useUpdateMeCandidateMutation,
  useUpdateMeCandidateImageMutation,
  useRetrieveMeCandidateContactCvQuery,
  useUpdateMeCandidateContactCvMutation,

  useListRecruitersQuery,
  useRetrieveRecruiterQuery,
  useRetrieveMeRecruiterQuery,
  useUpdateMeRecruiterMutation,

  useListMyCompaniesQuery,
  useRetrieveMyCompanyQuery,
  usePostMyCompanyMutation,
  useUpdateMyCompanyMutation,
  useDeleteMyCompanyMutation,

  useListMyVacanciesQuery,
  useRetrieveMyVacancyQuery,
  usePostMyVacancyMutation,
  useUpdateMyVacancyMutation,
  useDeleteMyVacancyMutation,

  usePostIsSpamEmailEveryWeekMutation,
  useDeleteIsSpamEmailEveryWeekMutation,
} = accountsApiSlice;