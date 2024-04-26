"use server";
import { client } from "../client/woocomerce-client";

export async function getAllProducts(
  page = 1,
  per_page = 60,
  orderby = "price",
  asc = false
) {
  try {
    const response = await client.get("products", {
      orderby: orderby,
      order: asc ? "asc" : "desc",
      page: page,
      per_page: per_page,
    });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getAllCategories() {
  try {
    const response = await client.get("products/categories");
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getProductsByCategory(category_id = 0) {
  try {
    const response = await client.get(`products?category=${category_id}`);
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getProductsFromArrayOfCategory(category_ids = []) {
  try {
    let productsByCategory = [];
    category_ids = category_ids.forEach((id) => {
      productsByCategory.push(getProductsByCategory(id));
    });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

// TODO: fn that returns all products from category :: param=category_id
// TODO: fn that return all products in specific counntry :: REQUIRES PLUGGIN "multi-currency"
