import {apiSlice} from "@/lib/services/apiSlice";
import {BaseApi} from "@/utils/Interface";


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
  result: [Candidate]
}

interface Recruiters {
  result: [Recruiter]
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

  usePostIsSpamEmailEveryWeekMutation,
  useDeleteIsSpamEmailEveryWeekMutation,
} = accountsApiSlice;