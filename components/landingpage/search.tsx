import { SerializedProduct } from "@/lib/types";
import { SearchProducts } from "@/components/search-products";

const Search = ({ products }: { products: SerializedProduct[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
      <div className="mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
          Find det perfekte klip
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Søg efter årstal, emne eller stemning
        </p>
        <SearchProducts products={products} />
      </div>
    </div>
  );
};

export default Search;
