"use client";
import Spinner from "@/components/general/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <Spinner/>
      </div>
    </div>
  )
}
