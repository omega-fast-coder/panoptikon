"use client";

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SerializedProduct } from "@/lib/types";
import { ShoppingCart, ImageIcon, Check } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: SerializedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, description, price, stockUnits, imageUrl } = product;
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

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
    <Card className="w-full max-w-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-0">
      <div className="relative">
        {hasValidImage ? (
          <Image
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
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

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{name}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <p className="text-sm text-muted-foreground">
            {stockUnits} stk. på lager
          </p>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {price.toFixed(2)},- kr.
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
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
        <Button size="lg" variant="outline" className="w-full">
          Se detaljer
        </Button>
      </CardFooter>
    </Card>
  );
}
