import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    type_profile: string,
  };
}


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  token: null,
  user: {},
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
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    },
  },
});

export const {setAuth, setUser, logout, finishInitialLoad} = authSlice.actions;
export default authSlice.reducer;