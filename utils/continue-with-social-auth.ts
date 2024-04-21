import {toast} from "react-toastify";


export default async function continueWithSocialAuth(provider: string, redirect: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/o/${provider}/?redirect_uri=${
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : 'http://localhost:3000'
    }/${redirect}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (res.status === 200 && typeof window !== "undefined") {
      window.location.replace(data.authorization_url);
    } else {
      toast.error(`Failed to continue with ${provider} social auth nested`)
    }

  } catch (err) {
    toast.error(`Failed to continue with ${provider} social auth`)
  }
}