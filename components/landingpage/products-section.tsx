import { PackageIcon, TrendingUpIcon } from "lucide-react";
import ProductCard from "@/components/product-card";
import { SerializedProduct } from "@/lib/types";
import { Button } from "@/components/ui/button";

const ProductsSection = ({ products }: { products: SerializedProduct[] }) => {
  return (
    <div
      id="all-products"
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16"
    >
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium mb-4">
          <TrendingUpIcon className="h-4 w-4" />
          Komplet katalog
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Hele vores vintage-samling
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Gennemse alle {products.length} unikke klip fra vores arkiv. Fra
          sort/hvid naturscener til farverige DDR-reklamer.
        </p>
      </div>

      {/* All Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More Button (if needed in future) */}
      {products.length > 20 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            <PackageIcon className="h-4 w-4" />
            Indlæs flere klip
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
