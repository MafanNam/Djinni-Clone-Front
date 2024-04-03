'use client';

import useVerify from "@/hooks/useVerify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
  useVerify();

  return <ToastContainer />;
}