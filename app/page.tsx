"use client";
import Image from "next/image";
import FashionLanding from "./FashionLanding/page";
import Test from "./test/page";
import Test2 from "./test2/pages";
import BrowseDressStyle from "./components/Catagories/page";
import Reviews from "./Reviews/page";
import Brands from "./Brands/pages";
import { useQuery } from "@apollo/client";
import { GET_Reviews } from "./graphql/queries";

type Review = {
  id: number;
  user: string;
  rating: number;
  content: string;
  date: string;
};

export default function Home() {





  return (
   <div>
    <FashionLanding></FashionLanding>
    <Brands></Brands>
    <div>
    <Test></Test>
    <Test2></Test2>
    <BrowseDressStyle></BrowseDressStyle>
    <Reviews></Reviews>
    </div>
   </div>
  );
}
