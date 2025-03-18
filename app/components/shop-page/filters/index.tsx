import React from "react";
import CategoriesSection from "../filters/CategoriesSection";
import ColorsSection from "../filters/ColorsSection";
import DressStyleSection from "../filters/DressStyleSection";
import PriceSection from "../filters/PriceSection";
import SizeSection from "../filters/SizeSection";
import { Button } from "../../ui/button";

const Filters = () => {
  return (
    <>
   
  
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection />
      <hr className="border-t-black/10" />
      <DressStyleSection />
 =
    </>
  );
};

export default Filters;
