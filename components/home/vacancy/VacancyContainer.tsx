"use client";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import VacancyCard from "@/components/home/vacancy/VacancyCard";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {useListVacanciesQuery} from "@/lib/features/vacancies/vacancyPublicApiSlice";
import Autoplay from "embla-carousel-autoplay";

export default function VacancyContainer() {
  const {data: vacancies, isLoading, isFetching} = useListVacanciesQuery()

  let loader = null;
  if (isLoading || isFetching) {
    loader = (
      <div className='flex p-7 ml-2 lg:ml-1.5 space-x-8'>
        {Array.from('123').map((_, index) =>
          <div key={index}>
            <div className='bg-gray-900 bg-muted/30 rounded-2xl p-7'>
              <div className='grid gap-2'>
                <div className='flex justify-center items-center w-full'>
                  <Skeleton className="h-7 w-7 rounded-full ml-2"/>
                  <Skeleton className="h-5 w-20 rounded-full ml-2"/>
                  <Skeleton className="h-5 w-28 rounded-full ml-2"/>
                  <Skeleton className="h-4 w-7 rounded-xl ml-auto"/>
                  <Skeleton className="h-4 w-7 rounded-xl ml-2"/>
                </div>
                <Skeleton className="h-8 w-40 lg:w-72 rounded-2xl ml-2 mb-5"/>
                <Skeleton className="h-5 w-28 rounded-2xl"/>
                <Skeleton className="h-28 w-full rounded-2xl mt-2"/>
              </div>
              <Skeleton className="h-5 w-28 rounded-2xl mt-5"/>

              <div className='flex justify-center items-center w-full mt-4'>
                <Skeleton className="h-6 w-28 rounded-2xl"/>
                <Skeleton className="h-6 w-28 rounded-2xl ml-auto"/>
              </div>
              <div className='flex justify-center items-center w-full mt-3'>
                <Skeleton className="h-6 w-28 rounded-2xl"/>
                <Skeleton className="h-6 w-28 rounded-2xl ml-auto"/>
              </div>
              <Skeleton className="h-2 w-full rounded-2xl mt-6"/>
              <div className='flex justify-center items-center w-full mt-6'>
                <Skeleton className="h-6 w-28 rounded-2xl"/>
                <Skeleton className="h-6 w-28 rounded-2xl ml-auto"/>
              </div>
              <div className='flex justify-center items-center w-full mt-3'>
                <Skeleton className="h-6 w-28 rounded-2xl"/>
                <Skeleton className="h-6 w-28 rounded-2xl ml-auto"/>
              </div>
              <div className='flex justify-center items-center w-full mt-3'>
                <Skeleton className="h-6 w-28 rounded-2xl"/>
                <Skeleton className="h-6 w-28 rounded-2xl ml-auto"/>
              </div>
              <div className='flex justify-center items-center w-full mt-3'>
                <Skeleton className="h-6 w-28 rounded-2xl"/>
                <Skeleton className="h-6 w-28 rounded-2xl ml-auto"/>
              </div>
              <Skeleton className="h-6 w-28 rounded-2xl mt-6"/>

            </div>
            <br/>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='py-20 md:px-16 px-8'>
      <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span
        className='text-[#504ED7]'>Latest</span> Vacancy</h1>
      <div className='flex items-center justify-center'>
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 12000,
            }),
          ]}
          className="w-full max-w-72 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl"
        >
          <CarouselContent>
            {loader ||
              vacancies?.results.slice(0, 10).map((vacancy) => (
                <CarouselItem key={vacancy.id} className="md:basis-1/2 lg:basis-1/3 p-7 ml-2 lg:ml-1.5">
                  <VacancyCard vacancy={vacancy}/>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className='hide-mobile'/>
          <CarouselNext className='hide-mobile'/>
        </Carousel>
      </div>


      <Link href='/jobs'
            className='bg-white dark:bg-purple-800 dark:bg-opacity-20 m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>
        Find More Vacancy
      </Link>
    </div>
  )
}