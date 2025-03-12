export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  variants: any;
  images: any;
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  variantId:string
};
