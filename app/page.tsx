"use client";
import Jumbotron from "@/components/home/Jumbotron";
import CategoryContainer from "@/components/home/category/CategoryContainer";
import CompanyContainer from "@/components/home/company/CompanyContainer";
import ReviewContainer from "@/components/home/review/ReviewContainer";



export default function Home() {
  return (
    <>
      <div>
        <Jumbotron/>
        <CategoryContainer/>
        <CompanyContainer/>
        <ReviewContainer/>
      </div>
    </>
  )
}
