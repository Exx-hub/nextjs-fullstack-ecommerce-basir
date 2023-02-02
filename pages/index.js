import ProductItem from "@/components/ProductItem";
import data from "@/utils/data";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.products.map((item) => (
        <ProductItem key={item.slug} product={item} />
      ))}
    </section>
  );
}
