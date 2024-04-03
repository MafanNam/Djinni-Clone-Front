import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from "@/lib/services/apiSlice";
import authReducer from "@/lib/features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']