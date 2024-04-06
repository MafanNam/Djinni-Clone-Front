'use client';

import useVerify from "@/hooks/useVerify";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTheme} from "next-themes";
import {setCredentials} from "@/lib/features/auth/authSlice";
import {useDispatch} from "react-redux";

export default function Setup() {
  // useVerify();
  const dispatch = useDispatch();
  dispatch(setCredentials({}))
  
  const {theme} = useTheme()

  return <ToastContainer
    position="bottom-right"
    theme={theme}
  />;
}