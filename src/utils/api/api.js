"use server";
import { client } from "../client/woocomerce-client";

export async function getAllProducts() {
  try {
    const response = await client.get("products");
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
