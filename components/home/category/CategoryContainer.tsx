"use client";
import CategoryCard from "@/components/home/category/CategoryCard";
import Spinner from "@/components/general/Spinner";
import {useListCategoryQuery} from "@/lib/features/other/otherApiSlice";


export default function CategoryContainer() {
  const {data, isLoading, isFetching} = useListCategoryQuery();


  return (
    <div className='bg-gray-100 dark:bg-gray-900 dark:bg-opacity-50 py-20 md:px-16 px-8'>
      <h1 style={{lineHeight: '65px'}} className='md:text-4xl text-3xl font-medium text-center mb-10'>Platform <br
        className='hidden md:block'/> Many <span className='text-[#504ED7]'>Category</span></h1>
      {(isLoading || isFetching) && <Spinner/>}
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {
          data?.results.slice(0, 8).map((item) => (
            <CategoryCard
              key={item.id}
              name={item.name}
            />
          ))
        }
      </div>
    </div>
  )
}