"use client";
import Jumbotron from "@/components/home/Jumbotron";
import CategoryContainer from "@/components/home/category/CategoryContainer";
import CompanyContainer from "@/components/home/company/CompanyContainer";
import ReviewContainer from "@/components/home/review/ReviewContainer";
import VacancyContainer from "@/components/home/vacancy/VacancyContainer";



export default function Home() {

  return (
    <>
      <div>
        <Jumbotron/>
        <CategoryContainer/>
        <VacancyContainer/>
        <CompanyContainer/>
        <ReviewContainer/>
      </div>
    </>
  )
}
