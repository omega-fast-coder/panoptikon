import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Grid3X3 } from "lucide-react";
import { SerializedProduct } from "@/lib/types";

interface ProductsGridProps {
  products: SerializedProduct[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 sm:py-16">
      {/* Section Header for Mobile */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          Alle produkter
        </h2>
        <p className="text-sm text-muted-foreground">
          Udforsk vores udvalg af produkter i denne kategori
        </p>
      </div>

      {/* Responsive Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More Button (if needed in future) */}
      {products.length > 6 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            <Grid3X3 className="h-4 w-4" />
            Se flere produkter
          </Button>
        </div>
      )}
    </div>
  );
}
