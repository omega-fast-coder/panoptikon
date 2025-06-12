"use client";

import { getProducts } from "@/lib/actions/products";
import { SerializedProduct } from "@/lib/types";
import { useEffect, useState } from "react";

export const ProductItem = () => {
  const [products, setProducts] = useState<SerializedProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price.toFixed(2)},-</p>
          <p>{product.stockUnits}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
