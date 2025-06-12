import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/lib/types";

interface CartReviewProps {
  items: CartItem[];
  totalItems: number;
}

export function CartReview({ items, totalItems }: CartReviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Din kurv ({totalItems} varer)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
            <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="rounded-lg object-cover"
                />
              ) : (
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">Antal: {item.quantity}</span>
                <span className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)},- kr.
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
