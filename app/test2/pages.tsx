'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link"; // <-- Next.js ka Link import karo
import { getProducts } from "../../lib/Shopify";

export default function Test2() {
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
    <h1 className="text-4xl font-bold text-black mt-7 mb-10 text-center">Top Selling</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.slice(3, 6).map((product) => (
        <div key={product.id}>
          <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
            <Link href={`/products/${product.handle}`}>
              <Image
                src={product.images?.edges[0]?.node.url}
                width={295}
                height={298}
                className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
                alt={product.title}
                priority
              />
            </Link>
          </div>
          <strong className="text-black xl:text-xl">{product.title}</strong>
          <div className="flex items-end mb-1 xl:mb-2">
          
            <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
              {product.rating?.toFixed(1)}
         
            </span>
          </div>
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            {product.discount?.percentage > 0 ? (
              <span className="font-bold text-black text-xl xl:text-2xl">
                {`$${Math.round(
                  product.variants?.edges[0]?.node.price.amount -
                    (product.variants?.edges[0]?.node.price.amount * product.discount?.percentage) / 100
                )}`}
              </span>
            ) : product.discount?.amount > 0 ? (
              <span className="font-bold text-black text-xl xl:text-2xl">
                {`$${product.variants?.edges[0]?.node.price.amount - product.discount?.amount}`}
              </span>
            ) : (
              <span className="font-bold text-black text-xl xl:text-2xl">
                ${product.variants?.edges[0]?.node.price.amount || "N/A"}
              </span>
            )}
            {product.discount?.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                ${product.variants?.edges[0]?.node.price.amount}
              </span>
            )}
            {product.discount?.amount > 0 && (
              <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                ${product.variants?.edges[0]?.node.price.amount}
              </span>
            )}
            {product.discount?.percentage > 0 ? (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${product.discount?.percentage}%`}
              </span>
            ) : (
              product.discount?.amount > 0 && (
                <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-$${product.discount?.amount}`}
                </span>
              )
            )}
          </div>
        </div>
      ))}
    </div>
    <div className="flex mt-10 justify-center">
  <Link href="/collections/top-selling">
    <p className="text-black text-2xl border py-2 rounded-3xl px-12 transition duration-300 hover:bg-blue-500 hover:text-white cursor-pointer">
      View All
    </p>
  </Link>
</div>
  </div>
  );
}
