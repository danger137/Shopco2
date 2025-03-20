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
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="sticky top-0 bg-white z-20 w-full shadow-sm">
    <div className="flex relative max-w-7xl mx-auto items-center justify-between py-4 px-4 md:px-6 xl:px-8">
      
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
          SHOP.CO
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <NavigationMenu>
          <NavigationMenuList>
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className="flex items-center text-black font-semibold px-4 py-2">
                Collections
                <span className={`ml-2 transition-transform ${isHovered ? "rotate-180" : "rotate-0"}`}>▼</span>
              </button>
              <div
                className={`absolute left-0 mt-2 w-60 bg-white border shadow-lg rounded-md transition-all ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex flex-col text-black px-3 py-2">
                  {collections.map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.handle}`} className="hover:underline">
                      {collection.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        <Link className="text-black font-semibold px-4 py-2" href={"/Blog"}>
          Blog
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-black p-2 focus:outline-none">
        ☰
      </button>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
        {/* Mobile View: Collections & Blog */}
<div className="md:hidden flex flex-col items-center justify-center py-2 bg-white">
  <NavigationMenu>
    <NavigationMenuList>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="flex items-center text-black font-semibold px-4 py-2">
          Collections
          <span className={`ml-2 transition-transform ${isHovered ? "rotate-180" : "rotate-0"}`}>▼</span>
        </button>
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-60 bg-white border shadow-lg rounded-md transition-opacity duration-200 ${
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

  <Link href="/Blog" className="text-black font-semibold py-2">
    Blog
  </Link>
</div>

        </div>
      )}

      {/* Search Bar (Hidden on Mobile) */}
      <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-4 hidden md:block">
        <InputGroup className="bg-[#F0F0F0] text-black w-full">
          <InputGroup.Text>
            <Image priority src="/icons/search.svg" height={20} width={20} alt="search" />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </InputGroup>

        {searchResults.length > 0 && (
          <div className="absolute left-0 mt-2 bg-white border shadow-lg rounded-md w-full">
            <div className="flex flex-col text-black px-3 py-2">
              {searchResults.map((product) => (
                <Link key={product.id} href={`/products/${product.handle}`} className="flex items-center p-2 hover:bg-gray-100">
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

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <CartBtn />
        <Link href="/#signin" className="p-1">
          <Image priority src="/icons/user.svg" height={24} width={24} alt="user" />
        </Link>
      </div>
    </div>
  </nav>
  );
};

export default TopNavbar;
