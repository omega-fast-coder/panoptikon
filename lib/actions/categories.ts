import { prisma } from "../prisma";

/* Get all categories */
export async function getCategories() {
  try {
    const categories = await prisma.productsCategories.findMany();
    return categories;
  } catch (error) {
    console.error("[GET_CATEGORIES] Error fetching categories:", error);
  }
}

/* Get a category by slug */
export async function getCategoryBySlug(id: string) {
  try {
    const category = await prisma.productsCategories.findUnique({
      where: { id: parseInt(id) },
    });
    return category;
  } catch (error) {
    console.error("[GET_CATEGORY_BY_SLUG] Error fetching category:", error);
  }
}
