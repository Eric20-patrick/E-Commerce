"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProducutItem from "./product-item";

interface ProductsListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductsList = ({ title, products }: ProductsListProps) => {
  return (
    <div className="space-y-3">
      <h3 className="px-5 font-semibold"> {title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProducutItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
