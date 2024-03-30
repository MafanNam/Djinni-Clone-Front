import CategoryCard from "@/components/home/category/CategoryCard";
import {Key} from "react";
import {useCategories} from "@/services/queries";
import Loader from "@/components/general/Loader";
import Spinner from "@/components/general/Spinner";
import {InfinitySpin} from "react-loader-spinner";


// @ts-ignore
export default function CategoryContainer() {
  const {data: dataCategories, isLoading} = useCategories()



  return (
    <div className='bg-gray-100 py-20 md:px-16 px-8'>
      <h1 style={{lineHeight: '65px'}} className='md:text-4xl text-3xl font-medium text-center mb-10'>Platform <br
        className='hidden md:block'/> Many <span className='text-[#504ED7]'>Category</span></h1>
      {isLoading && <Spinner/>}
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {
          dataCategories?.results.map((item: { id: Key | null | undefined; name: any; }) => (
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