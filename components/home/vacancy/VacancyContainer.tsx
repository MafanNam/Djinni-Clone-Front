"use client";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import VacancyCard from "@/components/home/vacancy/VacancyCard";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {useListVacanciesQuery} from "@/lib/features/vacancies/vacancyPublicApiSlice";
import Autoplay from "embla-carousel-autoplay";

export default function VacancyContainer() {
  const {data: vacancies, isLoading, isFetching} = useListVacanciesQuery()


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
            {(isLoading || isFetching) && (
              <>
                <Skeleton className="h-[215px] w-[330px] rounded-l"/>
                <Skeleton className="h-[215px] w-[330px] rounded-l"/>
                <Skeleton className="h-[215px] w-[330px] rounded-l"/>
              </>
            )}
            {
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