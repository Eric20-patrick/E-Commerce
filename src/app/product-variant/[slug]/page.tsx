import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/common/footer";
import Header from "@/components/ui/common/header";
import ProductsList from "@/components/ui/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const productVariant = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      {/* image */}
      <div className="flex-flex-col mb-4 space-y-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full"
        />
        {/*variantes*/}
        <div className="px-5">
          <VariantSelector variants={productVariant.product.variants} />
        </div>
        {/*descrição*/}
        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>
        <div className="px-5">
          {/*quantidade*/}
          <QuantitySelector />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          <div className="px-5">
            <p className="text-shadow-amber-600">
              {productVariant.product.description}
            </p>
          </div>
          <Button
            className="cursor-pointer rounded-full"
            size="lg"
            variant="outline"
          >
            Adicionar á sacola
          </Button>
          <Button className="sizes=lg cursor-pointer rounded-full">
            Comprar agora
          </Button>
        </div>

        {/*Produtos relacionados ao que o usuario esta vendo*/}
        <ProductsList title="Talves você goste" products={likelyProducts} />
      </div>
      <Footer />
    </>
  );
};

export default productVariant;
