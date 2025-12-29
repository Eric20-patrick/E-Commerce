import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/ui/common/category-selector";
import Footer from "@/components/ui/common/footer";
import Headers from "@/components/ui/common/header";
import MarcasParceiras from "@/components/ui/common/partnerBrands";
import ProductsList from "@/components/ui/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});
  return (
    <>
      <Headers />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <h3 className="h-252px w-252px px-5 font-semibold">Marcas Parceiras</h3>
        <MarcasParceiras />

        <ProductsList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductsList products={newlyCreatedProducts} title="Novidades" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
