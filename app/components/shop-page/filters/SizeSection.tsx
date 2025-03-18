"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSizeSelection } from "@/lib/features/products/productsSlice"; // Ensure correct import path
import { RootState } from "@/lib/store"; // Ensure correct import path
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { cn } from "@/lib/utils";

const SizeSection = () => {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state: RootState) => state.products.sizeSelection);

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const handleSizeSelect = (size: string) => {
    dispatch(setSizeSelection(size)); 
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {sizes.map((size, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "m-1 bg-black text-white flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                  selectedSize === size && "bg-black font-medium text-white",
                ])}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
