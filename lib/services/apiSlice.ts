import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import {logout, setAuth} from '@/lib/features/auth/authSlice'
import {Mutex} from 'async-mutex'


const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api/v1`,
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)
  console.log(result)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/jwt/refresh/',
            method: 'POST',
          },
          api,
          extraOptions,
        );
        if (refreshResult?.data) {
          api.dispatch(setAuth())

          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } catch (e) {
        console.log(e);
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result;
}


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: builder => ({}),
});


