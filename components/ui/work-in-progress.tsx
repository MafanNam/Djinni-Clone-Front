"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export default function WorkInProgress() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center w-full min-h-[400px]'>
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Still Under Development</h1>
          <p
            className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            We are still working on this page. Please check back later for updates.
          </p>
        </div>
        <Button onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  )
}