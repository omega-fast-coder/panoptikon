"use server";

import { prisma } from "../prisma";
import { SerializedProduct } from "../types";

export async function getProducts(): Promise<SerializedProduct[] | undefined> {
  try {
    const products = await prisma.products.findMany();

    // Convert Decimal prices to numbers for client serialization
    const serializedProducts: SerializedProduct[] = products.map((product) => ({
      ...product,
      price: product.price.toNumber(), // Convert Decimal to number
    }));

    return serializedProducts;
  } catch (error) {
    console.error("[GET_PRODUCTS] ", error);
  }
}

/* Get prodcuts by category */
export async function getProductsByCategory(
  categoryId: string
): Promise<SerializedProduct[] | undefined> {
  try {
    const products = await prisma.products.findMany({
      where: { categoryId: parseInt(categoryId) },
    });

    const serializedProducts: SerializedProduct[] = products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));

    return serializedProducts;
  } catch (error) {
    console.error("[GET_PRODUCTS_BY_CATEGORY] ", error);
  }
}
