"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React from "react";

type VariantType = {
  id: string;
  price: {
    amount: number;
    currencyCode: string;
  };
  // Add any other properties your variant may have
};


const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );


 

  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={() =>
        dispatch(
          addToCart({
            id: data.id,
            name: data.title,
            srcUrl: data.images?.edges[0]?.node.url,
            price: data.variants?.edges[0]?.node.price.amount,
            attributes: [sizeSelection, colorSelection.name],
            discount: data.discount,
            quantity: data.quantity,
            variantId: data.variants?.edges[0]?.node.id,
            variants: data.variants?.edges.map((edge: { node: VariantType }) => edge.node) || []
          })                  
        )
      }
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
