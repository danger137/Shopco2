"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_Description } from "@/app/graphql/queries";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LinksSection from "./LinksSection";
import LayoutSpacing from "./LayoutSpacing";

const socialsData = [
  { id: 1, icon: <FaTwitter />, url: "https://twitter.com" },
  { id: 2, icon: <FaFacebookF />, url: "https://facebook.com" },
  { id: 3, icon: <FaInstagram />, url: "https://instagram.com" },
  { id: 4, icon: <FaGithub />, url: "https://github.com/mohammadoftadeh" },
];

const paymentBadgesData = [
  { id: 1, srcUrl: "/icons/Visa.svg", alt: "Visa" },
  { id: 2, srcUrl: "/icons/mastercard.svg", alt: "Mastercard" },
  { id: 3, srcUrl: "/icons/paypal.svg", alt: "PayPal" },
  { id: 4, srcUrl: "/icons/applePay.svg", alt: "Apple Pay" },
  { id: 5, srcUrl: "/icons/googlePay.svg", alt: "Google Pay" },
];

const Footer = () => {
  const { loading, error, data } = useQuery(GET_Description);



  const description = data?.footerDescriptionCollection?.items[0]?.description;
  const description2 = data?.footerDescriptionCollection?.items[0]?.description2;

  return (
    <footer className="mt-10">
      <div className="pt-8 text-black md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <h1 className={cn(integralCF.className, "text-[28px] lg:text-[32px] mb-6")}>
                SHOP.CO
              </h1>

            
              {loading ? (
                <p className="text-black/60 text-sm mb-9">Loading...</p>
              ) : error ? (
                <p className="text-red-500 text-sm mb-9">Failed to load data.</p>
              ) : (
                <p className="text-black/60 text-sm mb-9">
                  {description || "No description available."}
                </p>
              )}

              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link key={social.id} href={social.url} target="_blank">
                    <span className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20 flex items-center justify-center p-1.5">
                      {social.icon}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>

          <hr className="h-[1px] border-t-black/10 my-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
       
            <p className="text-sm text-center sm:text-left text-black/60 mb-4 sm:mb-0">
              {loading ? (
                "Loading..."
              ) : error ? (
                "Failed to load data."
              ) : (
                description2 || "No footer description available."
              )}
            </p>

            <div className="flex items-center">
              {paymentBadgesData.map((badge) => (
                <span
                  key={badge.id}
                  className="w-[46px] h-[30px] rounded-[5px] border-[#D6DCE5] bg-white flex items-center justify-center mr-3 last:mr-0"
                >
                  <Image priority src={badge.srcUrl} width={33} height={100} alt={badge.alt} className="max-h-[15px]" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
