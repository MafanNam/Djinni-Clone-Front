"use client";
import {useActivationMutation} from "@/lib/features/auth/authApiSlice";
import {useEffect} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

interface Props {
  params: {
    uid: string,
    token: string,
  }
}


export default function Page({params}: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation()

  useEffect(() => {
    const {uid, token} = params

    activation({uid, token})
      .unwrap()
      .then(() => {
        toast({
          title: "Account activated.",
        })
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Failed to activate account",
          description: err.message,
        })
      })
      .finally(() => {
        router.push("/auth/login")
      });
  }, [activation, params, router])


  return (
    <section className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Activating your account...
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
