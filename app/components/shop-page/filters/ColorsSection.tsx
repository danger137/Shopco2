"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColorSelection } from "@/lib/features/products/productsSlice"; 
import { RootState } from "@/lib/store"; 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";

const colorOptions = [
  { name: "Green", code: "bg-green-600" },
  { name: "Red", code: "bg-red-600" },
  { name: "Yellow", code: "bg-yellow-300" },
  { name: "Orange", code: "bg-orange-600" },
  { name: "Cyan", code: "bg-cyan-400" },
  { name: "Blue", code: "bg-blue-600" },
  { name: "Purple", code: "bg-purple-600" },
  { name: "Pink", code: "bg-pink-600" },
  { name: "White", code: "bg-white" },
  { name: "Black", code: "bg-black" },
];

const ColorsSection = () => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(
    (state: RootState) => state.products.colorSelection.name
  );

  const handleColorSelect = (color: string) => {
    dispatch(setColorSelection({ name: color, code: colorOptions.find(c => c.name === color)?.code || "" }));
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  color.code,
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20",
                ])}
                onClick={() => handleColorSelect(color.name)}
              >
                {selectedColor === color.name && (
                  <IoMdCheckmark className="text-base text-white" />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
