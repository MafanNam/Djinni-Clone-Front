import {apiSlice} from "@/lib/services/apiSlice";
import {BaseApi} from "@/utils/Interface";


export interface Candidate extends BaseApi {
  results: {
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
    image: string;
    find_job: string;
  }
}


export interface Recruiter extends BaseApi {
  results: {
    first_name: string;
    last_name: string;
    position: string;
    category: string;
    company: {
      id: number;
      name: string;
      image: string;
      country: string;
    };
    image: string;
    trust_hr: boolean;
  }
}

interface Candidates {
  result: [Candidates]
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
    }),
    updateMeCandidate: builder.mutation<Candidate, void>({
      query: (data) => ({
        url: '/accounts/candidates/me/',
        method: "PATCH",
        body: data,
      }),
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
    }),
    updateMeRecruiter: builder.mutation<Recruiter, void>({
      query: (data) => ({
        url: '/accounts/recruiters/me/',
        method: "PATCH",
        body: data,
      }),
    }),
  })
})


export const {
  useListCandidatesQuery,
  useRetrieveCandidateQuery,
  useRetrieveMeCandidateQuery,
  useUpdateMeCandidateMutation,

  useListRecruitersQuery,
  useRetrieveRecruiterQuery,
  useRetrieveMeRecruiterQuery,
  useUpdateMeRecruiterMutation,
} = accountsApiSlice;