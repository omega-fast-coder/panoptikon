"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SerializedProduct } from "@/lib/types";
import { ShoppingCart, ImageIcon, Check, Eye } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import Image from "next/image";
import { useState } from "react";
import ProductDetailsModal from "./product-details-modal";

interface ProductCardProps {
  product: SerializedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, description, price, stockUnits, imageUrl } = product;
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if we have a valid image URL
  const hasValidImage = imageUrl && imageUrl.trim() !== "";

  // Check if item is already in cart
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAdding(false);
  };

  return (
    <Card className="w-full h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-0 flex flex-col">
      {/* Image Section - Fixed Height */}
      <div className="relative flex-shrink-0">
        {hasValidImage ? (
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        ) : (
          // Fallback placeholder for empty images
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <div className="text-center space-y-2">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Intet billede</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section - Flexible Height */}
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
            {name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {description}
          </p>

          <div className="mt-auto pt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              {stockUnits} stk. på lager
            </p>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {price.toFixed(2)},- kr.
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer Section - Fixed at Bottom */}
      <CardFooter className="p-4 pt-0 flex flex-col gap-2 mt-auto">
        <Button
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAdding || stockUnits === 0}
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Tilføjer...
            </>
          ) : isInCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />I kurv
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Tilføj til kurv
            </>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Se detaljer
        </Button>
      </CardFooter>

      <ProductDetailsModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
