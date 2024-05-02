import HeroSection from "@/components/Homepage/herosection";
import {
  getAllCategories,
  getAllProducts,
  getProductsFromArrayOfCategory,
} from "@/utils/api/api";

export default async function Home() {
  console.log("__________________________________________________");

  // const categories = await getAllCategories();
  // const prodsByCat = await getProductsFromArrayOfCategory(["15", "18", "21"]);

  return (
    <main className="-mt-16 overflow-x-hidden">
      <HeroSection />
      <HeroSection />
      <HeroSection />
    </main>
  );
}
