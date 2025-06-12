"use client";

import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { SearchIcon, X } from "lucide-react";
import { SerializedProduct } from "@/lib/types";
import ProductCard from "./product-card";
import { Button } from "./ui/button";

interface SearchProductsProps {
  products: SerializedProduct[];
}

export const SearchProducts = ({ products }: SearchProductsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products.slice(0, 8); // Show first 8 products when no search
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Søg efter produkter..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {filteredProducts.length > 0
              ? `Fundet ${filteredProducts.length} produkt${
                  filteredProducts.length !== 1 ? "er" : ""
                }`
              : "Ingen produkter fundet"}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.slice(0, 12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Prøv at søge efter noget andet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
