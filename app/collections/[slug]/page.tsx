"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "../../../lib/Shopify";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";


const GET_PRODUCTS_BY_COLLECTION = gql`
  query GetProductsByCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: { node: { url: string; altText?: string } }[];
  };
  variants: {
    edges: { node: { price: { amount: string; currencyCode: string } } }[];
  };
}

interface Collection {
  id: string;
  title: string;
  products: {
    edges: { node: Product }[];
  };
}

export default function CollectionPage() {
  const params = useParams(); 
  const [collection, setCollection] = useState<Collection | null>(null);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.slug) return;

      try {
        const { data } = await client.query<{ collectionByHandle: Collection }>({
          query: GET_PRODUCTS_BY_COLLECTION,
          variables: { handle: params.slug },
        });

        if (data?.collectionByHandle) {
          setCollection(data.collectionByHandle);
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.slug]);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (!collection?.products?.edges.length) return <p className="text-center p-4">No products found.</p>;

  const prices = collection.products.edges.map(
    (p) => parseFloat(p.node.variants.edges[0]?.node.price.amount) || 0
  );
  const highestPrice = Math.max(...prices, 1000);

  const filteredProducts = collection.products.edges.filter(({ node: product }) => {
    const price = parseFloat(product.variants.edges[0]?.node.price.amount) || 0;
    return price <= maxPrice;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold my-4">{collection.title}</h1>

    
      <div className="mb-4">
        <label className="block font-semibold">Filter by Price (Up to ${maxPrice})</label>
        <input
          type="range"
          min="0"
          max={highestPrice}
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(({ node: product }) => (
            <Link key={product.id} href={`/products/${product.handle}`} className="block">
              <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition">
                {product.images.edges.length > 0 && (
                  <Image
                    src={product.images.edges[0]?.node.url}
                    alt={product.images.edges[0]?.node.altText || "Product"}
                    width={300}
                    height={300}
                    className="rounded w-full h-60 object-cover"
                  />
                )}
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-500">
                  {product.variants.edges[0]?.node.price.amount} {product.variants.edges[0]?.node.price.currencyCode}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No products found in this price range.</p>
        )}
      </div>
    </div>
  );
}