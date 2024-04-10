"use client";
import Spinner from "@/components/general/Spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <Spinner/>
    </div>
  )
}
