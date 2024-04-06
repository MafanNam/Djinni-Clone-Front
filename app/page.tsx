"use client";
import Jumbotron from "@/components/home/Jumbotron";
import CategoryContainer from "@/components/home/category/CategoryContainer";
import CompanyContainer from "@/components/home/company/CompanyContainer";
import ReviewContainer from "@/components/home/review/ReviewContainer";
import {useDispatch} from "react-redux";
import {setCredentials} from "@/lib/features/auth/authSlice";



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
