import {
  getAllCategories,
  getAllProducts,
  getProductsFromArrayOfCategory,
} from "@/utils/api/api";

export default async function Home() {
  console.log("__________________________________________________");

  // const products = await getAllProducts(6, 5, "price", true);
  const categories = await getAllCategories();
  const prodsByCat = await getProductsFromArrayOfCategory(["15", "18", "21"]);

  // prodsByCat.forEach((prod) => {
  //   console.log(prod);
  // });

  console.log(categories);
  console.table(prodsByCat);
  return <main></main>;
}
