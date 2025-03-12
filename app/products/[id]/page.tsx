import { getProductByHandle } from "../../../lib/Shopify";
import BreadcrumbShop from "../../components/shop-page/BreadcrumbShop";
import Filters from "../../components/shop-page/filters";
import MobileFilters from "../../components/shop-page/filters/MobileFilters";
import ProductCard from "../../components/common/ProductCard";
import { FiSliders } from "react-icons/fi";
import {
  Pagination,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../../components/ui/pagination";
import AddToCardSection from "../../components/product-page/Header/AddToCardSection";

interface ProductPageProps {
  params: Promise<{ id: string }>; // 👈 params ko promise banaya
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params; // 👈 params ko await kiya
  const { id } = resolvedParams;

  if (!id) {
    return <p className="text-center text-red-500">Invalid product ID!</p>;
  }

  const product = await getProductByHandle(id);

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>

          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <h1 className="font-bold text-2xl md:text-[32px]">Product Details</h1>
              <MobileFilters />
            </div>

            <div className="w-full flex justify-center">
              <ProductCard key={product.id} data={product} />
            </div>

            <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
            <AddToCardSection data={product} />
            <hr className="border-t-black/10" />

            <Pagination className="justify-between">
              <PaginationPrevious href="#" className="border border-black/10" />
              <PaginationContent>
                {[1, 2, 3, "...", 8, 9, 10].map((num, index) =>
                  num === "..." ? (
                    <PaginationItem key={index}>
                      <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={index}>
                      <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                        {num}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
              </PaginationContent>
              <PaginationNext href="#" className="border border-black/10" />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
