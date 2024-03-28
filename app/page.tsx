import {Metadata} from 'next'
import Jumbotron from "@/components/home/Jumbotron";
import CategoryContainer from "@/components/home/category/CategoryContainer";
import CompanyContainer from "@/components/home/company/CompanyContainer";
import ReviewContainer from "@/components/home/review/ReviewContainer";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";

export const metadata: Metadata = {
  title: 'Job Seek | Home'
}

export default function Home() {
  const categories = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'JavaScript'},
    {id: 3, name: 'C++'},
  ]
  const companies = [
    {id: 1, title: 'Apple'},
    {id: 2, title: 'Xbox'},
    {id: 3, title: 'Microsoft'},
    {id: 4, title: 'Microsoft'},
  ]
  return (
    <>
      <Navbar/>
      <div>
        <Jumbotron/>
        <CategoryContainer categories={categories}/>
        <CompanyContainer companies={companies}/>
        <ReviewContainer/>
      </div>
      <Footer/>
    </>
  )
}
