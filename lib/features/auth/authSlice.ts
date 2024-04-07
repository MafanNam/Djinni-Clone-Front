import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
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
  user: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    },
  },
});

export const {setAuth, setUser, logout, finishInitialLoad} = authSlice.actions;
export default authSlice.reducer;