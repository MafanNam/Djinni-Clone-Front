import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoadingUser: boolean;
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
  isLoading: true,
  isLoadingUser: true,
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
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    },
    finishInitialLoadUser: state => {
      state.isLoadingUser = false;
    }
  },
});

export const {setAuth, setUser, logout, finishInitialLoad, finishInitialLoadUser} = authSlice.actions;
export default authSlice.reducer;