"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SerializedProduct } from "@/lib/types";
import { useCart } from "@/providers/cart-provider";
import {
  ShoppingCart,
  ImageIcon,
  Check,
  Package,
  Calendar,
  Tag,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";

interface ProductDetailsModalProps {
  product: SerializedProduct;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const { name, description, price, stockUnits, imageUrl, createdAt } = product;
  const { addItem, items, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Check if we have a valid image URL
  const hasValidImage = imageUrl && imageUrl.trim() !== "";

  // Check if item is already in cart and get its quantity
  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = async () => {
    setIsAdding(true);

    // If already in cart, update quantity, otherwise add new item
    if (isInCart && cartItem) {
      updateQuantity(product.id, cartItem.quantity + quantity);
    } else {
      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAdding(false);

    // Reset quantity and close modal
    setQuantity(1);
    onClose();
  };

  const incrementQuantity = () => {
    if (quantity < stockUnits) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Format the created date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold leading-tight pr-6">
            {name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          <div className="relative w-full">
            {hasValidImage ? (
              <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-64 sm:h-80 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-3">
                  <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Intet billede tilgængeligt
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Price and Stock */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">
                  {price.toFixed(2)},- kr.
                </div>
                <div className="text-sm text-muted-foreground">
                  Pris pr. stk.
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant={stockUnits > 0 ? "default" : "destructive"}
                  className="gap-2"
                >
                  <Package className="h-3 w-3" />
                  {stockUnits > 0 ? `${stockUnits} på lager` : "Udsolgt"}
                </Badge>

                <Badge variant="secondary" className="gap-2">
                  <Calendar className="h-3 w-3" />
                  {formatDate(createdAt.toString())}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Produktbeskrivelse
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <Separator />

            {/* Quantity Selector and Add to Cart */}
            {stockUnits > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Antal:</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="font-semibold text-lg min-w-[3rem] text-center">
                      {quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                      disabled={quantity >= stockUnits}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    <div className="text-sm text-muted-foreground ml-2">
                      (max {stockUnits} stk.)
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Total pris:</span>
                  <span className="text-xl font-bold text-primary">
                    {(price * quantity).toFixed(2)},- kr.
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {isInCart ? "Opdaterer kurv..." : "Tilføjer til kurv..."}
                    </>
                  ) : isInCart ? (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Tilføj flere til kurv
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Tilføj til kurv
                    </>
                  )}
                </Button>

                {isInCart && (
                  <div className="text-center text-sm text-muted-foreground">
                    <Check className="inline h-4 w-4 mr-1 text-green-600" />
                    Du har allerede {cartItem?.quantity} stk. i kurven
                  </div>
                )}
              </div>
            )}

            {/* Out of Stock Message */}
            {stockUnits === 0 && (
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">
                  Produktet er udsolgt
                </h3>
                <p className="text-muted-foreground">
                  Dette produkt er i øjeblikket ikke på lager. Prøv igen senere.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
