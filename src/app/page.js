import { getAllCategories, getAllProducts } from "@/utils/api/api";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // console.log(categories);

  return <main></main>;
}
