"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client, gql } from "@/lib/Shopify";
import Image from "next/image";
import InputGroup from "../../ui/input-group";
import CartBtn from "./CartBtn";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../../ui/navigation-menu";


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

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

interface CollectionEdge {
  node: CollectionNode;
}

const TopNavbar: React.FC = () => {
  const [collections, setCollections] = useState<CollectionEdge[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    client
      .query({ query: GET_COLLECTIONS })
      .then((response) => setCollections(response.data.collections.edges))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
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

        <NavigationMenu className="md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className="flex items-center text-black font-semibold px-4 py-2">
                Collections
                <span
                  className={`ml-2 transition-transform ${
                    isHovered ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`absolute left-0 mt-2 w-60 bg-white border shadow-lg rounded-md ${
                  isHovered
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex flex-col text-black px-3 py-2">
                  {collections.map(({ node }) => (
                    <Link
                      key={node.id}
                      href={`/collections/${node.handle}`}
                      className="hover:underline"
                      onClick={handleReset}
                    >
                      {node.title}
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

        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 text-black lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <div className="flex items-center">
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
