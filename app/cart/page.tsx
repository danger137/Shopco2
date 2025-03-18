"use client";

import BreadcrumbCart from "../../app/components/cart-page/BreadcrumbCart";
import ProductCard from "../../app/components/cart-page/ProductCard";
import { Button } from "../../app/components/ui/button";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { FaArrowRight } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { client ,gql} from "@/lib/Shopify";

const CREATE_CHECKOUT_MUTATION = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state: RootState) => state.carts);
  const [isMounted, setIsMounted] = useState(false);
  const [checkoutCreate, { loading: checkoutLoading }] = useMutation(
    CREATE_CHECKOUT_MUTATION,
    { client: client }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!cart?.items?.length) return;
    const lineItems = cart.items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));
    
    try {
      const { data } = await checkoutCreate({ variables: { input: { lineItems } } });
      if (data.checkoutCreate.checkout) {
        window.location.href = data.checkoutCreate.checkout.webUrl;
      } else {
        console.error("Checkout errors:", data.checkoutCreate.checkoutUserErrors);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2 className="font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6">
              Your Cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && <hr className="border-t-black/10" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">Order Summary</h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl text-black font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Discount (0%)</span>
                    <span className="md:text-xl font-bold text-red-600">$0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Delivery Fee</span>
                    <span className="md:text-xl text-black font-bold">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl text-black md:text-2xl font-bold">${totalPrice}</span>
                  </div>
                </div>
               
                <Button
                  type="button"
                  className="text-sm md:text-base text-white font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Processing..." : "Go to Checkout"}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
          </div>
        )}
      </div>
    </main>
  );
}
