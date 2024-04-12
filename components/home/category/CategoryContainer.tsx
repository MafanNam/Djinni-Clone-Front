"use client";
import CategoryCard from "@/components/home/category/CategoryCard";
import {useListCategoryQuery} from "@/lib/features/other/otherApiSlice";
import {Skeleton} from "@/components/ui/skeleton";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function CategoryContainer() {
  const {data, isLoading, isFetching} = useListCategoryQuery();


  return (
    <div className='bg-gray-100 dark:bg-gray-900 dark:bg-opacity-50 py-20 md:px-16 px-8'>
      <h1 style={{lineHeight: '65px'}} className='md:text-4xl text-3xl font-medium text-center mb-10'>Platform <br
        className='hidden md:block'/> Many <span className='text-[#504ED7]'>Category</span></h1>

      <div className='flex items-center justify-center'>
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-72 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl"
        >
          <CarouselContent>
            {(isLoading || isFetching) && (
              <>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
                <Skeleton className="h-[80px] w-[340px] rounded-l"/>
              </>
            )}
            {
              data?.results.slice(0, 8).map((item) => (
                <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <CategoryCard
                    key={item.id}
                    name={item.name}
                  />
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselPrevious className='hide-mobile'/>
          <CarouselNext className='hide-mobile'/>
        </Carousel>
      </div>
    </div>
  )
}