"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client, gql } from "@/lib/Shopify";
import Image from "next/image";
import InputGroup from "../../ui/input-group";
import CartBtn from "./CartBtn";
import { NavigationMenu, NavigationMenuList } from "../../ui/navigation-menu";

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

const GET_PRODUCTS = gql`
  query GetProducts($searchTerm: String!) {
    products(first: 10, query: $searchTerm) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`;

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
}

const TopNavbar: React.FC = () => {
  const [collections, setCollections] = useState<CollectionNode[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ProductNode[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    client
      .query({ query: GET_COLLECTIONS })
      .then((response) => setCollections(response.data.collections.edges.map((edge: any) => edge.node)))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      client
        .query({ query: GET_PRODUCTS, variables: { searchTerm } })
        .then((response) => setSearchResults(response.data.products.edges.map((edge: any) => edge.node)))
        .catch((err) => console.error("Error fetching products:", err));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleReset = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <Link href="/" className={cn([integralCF.className, "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 text-black"])}>
            SHOP.CO
          </Link>
        </div>

        <NavigationMenu className="md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <button className="flex items-center text-black font-semibold px-4 py-2">
                Collections
                <span className={`ml-2 transition-transform ${isHovered ? "rotate-180" : "rotate-0"}`}>▼</span>
              </button>
              <div
                className={`absolute left-0 mt-2 w-60 bg-white border shadow-lg rounded-md ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex flex-col text-black px-3 py-2">
                  {collections.map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.handle}`} className="hover:underline" onClick={handleReset}>
                      {collection.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        <Link className="text-black flex items-center me-10 font-semibold px-4 py-2 " href={"/Blog"}>
          Blog
        </Link>

        <div style={{width:"700px"}} className="relative me-5 ">
          <InputGroup  className="hidden md:flex bg-[#F0F0F0] text-black" >
            <InputGroup.Text>
              <Image priority src="/icons/search.svg" height={20} width={20} alt="search" />
            </InputGroup.Text>
            <InputGroup.Input type="search" placeholder="Search for products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>

          {searchResults.length > 0 && (
            <div className="absolute left-0 mt-2 bg-white border shadow-lg rounded-md" style={{ width: "250px" }}>
              <div className="flex flex-col text-black px-3 py-2">
                {searchResults.map((product) => (
                  <Link key={product.id} href={`/products/${product.handle}`} className="flex items-center p-2 hover:bg-gray-100" onClick={handleReset}>
                    <Image
                      src={product.featuredImage?.url || "/default-image.jpg"}
                      alt={product.featuredImage?.altText || "Product"}
                      width={40}
                      height={40}
                      className="rounded mr-2"
                    />
                    {product.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <CartBtn />
          <Link href="/#signin" className="p-1">
            <Image priority src="/icons/user.svg" height={100} width={100} alt="user" className="max-w-[22px] max-h-[22px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
