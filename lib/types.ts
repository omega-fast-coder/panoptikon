import { Products } from "./generated/prisma";

/**
 * Serialized version of Products where Decimal fields are converted to numbers
 * for client-side usage (Next.js serialization compatibility)
 */
export type SerializedProduct = Omit<Products, "price"> & {
  price: number;
};

export type SerializedProducts = SerializedProduct[];
