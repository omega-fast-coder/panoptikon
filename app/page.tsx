import EmptyState from "@/components/empty-state";
import CTA from "@/components/landingpage/cta";
import FeaturedCategories from "@/components/landingpage/featured-categories";
import Hero from "@/components/landingpage/hero";
import OfferSection from "@/components/landingpage/offer-section";
import ProductsSection from "@/components/landingpage/products-section";
import Search from "@/components/landingpage/search";
import Stats from "@/components/landingpage/stats";
import { getCategories } from "@/lib/actions/categories";
import { getProducts } from "@/lib/actions/products";
import { PackageIcon } from "lucide-react";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <EmptyState
            title="Ingen produkter tilgængelige"
            description="Vi har ingen produkter i øjeblikket, men hold øje - nye produkter kommer snart!"
            icon={PackageIcon}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* What We Offer Section */}
      <OfferSection />

      {/* Stats Section */}
      <Stats products={products} />

      {/* Search Section */}
      <Search products={products} />

      {/* All Products Section */}
      <ProductsSection products={products} />

      {/* Featured Categories */}
      {categories && categories.length > 0 && (
        <FeaturedCategories categories={categories} />
      )}

      {/* CTA Section */}
      <CTA />
      {/* Bottom Spacing */}
      <div className="h-16 sm:h-24" />
    </div>
  );
}
