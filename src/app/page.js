import { getAllCategories, getAllProducts } from "@/utils/api/api";

export default async function Home() {
  const products = await getAllProducts(6, 5, "price", true);
  const categories = await getAllCategories();

  console.log("__________________________________________________");

  // products.forEach((prod) => {
  //   console.log(prod.id, "::", prod.price, "::", prod.name);
  // });

  console.log(categories);
  return <main></main>;
}
