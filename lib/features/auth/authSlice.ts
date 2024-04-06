import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  access: string | null;
  user: {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    image: string,
    type_profile: string,
  } | null;
}


const initialState = {
  isAuthenticated: false,
  isLoading: false,
  access: null,
  user: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuthenticated = true;
    },
    setCredentials: (state, action) => {
      const access = Cookies.get('access') || null
      state.access = access;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.access = null;
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    },
  },
});

export const {setCredentials, setUser, logout, finishInitialLoad} = authSlice.actions;
export default authSlice.reducer;