"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client, gql } from "@/lib/Shopify";
import Image from "next/image";
import InputGroup from "../../ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../../ui/navigation-menu";

// Define TypeScript type for collections
type CollectionNode = {
  node: {
    id: string;
    title: string;
    handle: string;
  };
};

// GraphQL query to fetch collections
const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const TopNavbar = () => {
  const [collections, setCollections] = useState<CollectionNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    client
      .query({ query: GET_COLLECTIONS })
      .then((response) => {
        setCollections(response.data.collections.edges);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
          <ResTopNavbar data={collections.map(({ node }) => ({ title: node.title }))} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 text-black",
            ])}
          >
            SHOP.CO
          </Link>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {/* Dropdown Menu for Collections */}
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className="flex items-center text-black font-semibold px-4 py-2 focus:outline-none transition-all">
                Collections
                <span
                  className={`ml-2 transform transition-transform ${
                    isHovered ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`absolute left-0 mt-2 w-60 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden transition-all duration-300 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex flex-wrap px-3 py-2">
                  {collections.map(({ node }) => (
                    <Link key={node.id} href={`/collections/${node.handle}`} className="hover:underline">
                      {node.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>

        {/* Icons Section */}
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
          <Link href="/#signin" className="p-1">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
