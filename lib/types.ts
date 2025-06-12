import { Products } from "./generated/prisma";

/**
 * Serialized version of Products where Decimal fields are converted to numbers
 * for client-side usage (Next.js serialization compatibility)
 */
export type SerializedProduct = Omit<Products, "price"> & {
  price: number;
};

export type SerializedProducts = SerializedProduct[];

/**
 * Cart item type extending SerializedProduct with quantity
 */
export type CartItem = SerializedProduct & {
  quantity: number;
};

/**
 * Cart state and actions
 */
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartActions {
  addItem: (product: SerializedProduct) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
