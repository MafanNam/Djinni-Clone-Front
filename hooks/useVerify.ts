import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import {setAuth, finishInitialLoad, setCredentials} from '@/lib/features/auth/authSlice';
import { useVerifyMutation } from '@/lib/features/auth/authApiSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();

  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, [dispatch, verify]);
}