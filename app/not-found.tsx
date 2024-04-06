import Link from "next/link";
import {ChevronRightIcon} from "lucide-react";


export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center gap-2 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Uh oh! This page can’t be found.</h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          You may have mistyped the address or the page may have moved.
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        href="/"
      >
        <ChevronRightIcon className="w-4 h-4 translate-x-1"/>
        Go back home
      </Link>
    </div>
  )
}