import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";

interface EmptyCartProps {
  onReturnToShop: () => void;
}

export function EmptyCart({ onReturnToShop }: EmptyCartProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Din kurv er tom</h1>
        <p className="text-muted-foreground">
          Tilføj nogle produkter før du går til checkout
        </p>
        <Button onClick={onReturnToShop} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Fortsæt med at shoppe
        </Button>
      </div>
    </div>
  );
}
