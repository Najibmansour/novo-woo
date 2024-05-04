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
    <main className="-mt-20 overflow-x-hidden">
      <HeroSection />
      <HeroSection />
      <HeroSection />
    </main>
  );
}
// TODO: add invert prop to logo imge that inverts colors invert-[1] when its there
// TODO: fix window (check if window is available before callling it)
// TODO: fix login signup page (check vercel build erors)
