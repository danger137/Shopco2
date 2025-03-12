'use client';

import { useEffect, useState } from "react";
import Link from "next/link"; // <-- Next.js ka Link import karo
import { getProducts } from "../../lib/Shopify";

export default function Test() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const productData = await getProducts();
      setProducts(productData);
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopify Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <Link href={`/products/${product.handle}`}>
              <img src={product.images?.edges[0]?.node.url} alt={product.title} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <p className="font-bold">${product.variants?.edges[0]?.node.price.amount}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
