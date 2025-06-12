"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, X, CreditCard } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 z-50 group cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <Badge className="absolute bg-secondary text-black dark:text-white -top-7 -right-6 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold animate-in zoom-in-50">
                {totalItems > 99 ? "99+" : totalItems}
              </Badge>
            )}
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg ">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold">Din kurv</SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Din kurv er tom</h3>
              <p className="text-muted-foreground">
                Tilføj nogle produkter for at komme i gang
              </p>
            </div>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Fortsæt med at shoppe
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full px-5 pb-5">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold leading-tight">
                            {item.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive p-1 h-auto"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">
                              {(item.price * item.quantity).toFixed(2)},- kr.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.price.toFixed(2)},- kr. pr. stk.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end w-full">
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Tøm kurv
                </Button>
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-2xl text-primary">
                  {totalPrice.toFixed(2)},- kr.
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/checkout");
                  }}
                >
                  <CreditCard className="h-4 w-4" />
                  Gå til checkout
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Fortsæt med at shoppe
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
