import ProductCard from "@/components/product-card";
import EmptyState from "@/components/empty-state";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import {
  PackageIcon,
  Grid3X3,
  Sparkles,
  TrendingUpIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchProducts } from "@/components/search-products";

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
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-16 sm:px-6 lg:px-8 sm:pt-20 sm:pb-24">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Velkommen til Panoptikon
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">Find de</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  bedste produkter
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                Udforsk vores omfattende katalog af kvalitetsprodukter. Vi
                hjælper dig med at finde præcis det, du leder efter.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <PackageIcon className="h-3 w-3" />
                  {products.length} produkter
                </Badge>
              </div>
              {categories && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-2">
                    <Grid3X3 className="h-3 w-3" />
                    {categories.length} kategorier
                  </Badge>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <StarIcon className="h-3 w-3" />
                  Premium kvalitet
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
        <div className="mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Søg efter produkter
          </h2>
          <SearchProducts products={products} />
        </div>
      </div>

      {/* Featured Categories */}
      {categories && categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Populære kategorier
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Udforsk vores mest populære produktkategorier
            </p>
          </div>

          <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="text-center space-y-3">
                  <div
                    className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center ${
                      index % 4 === 0
                        ? "bg-red-100 text-red-600"
                        : index % 4 === 1
                        ? "bg-blue-100 text-blue-600"
                        : index % 4 === 2
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    <Grid3X3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/categories">Se alle kategorier</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium mb-4">
            <TrendingUpIcon className="h-4 w-4" />
            Alle produkter
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Udforsk vores produktkatalog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gennemse alle vores produkter og find det perfekte match til dine
            behov
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-4 sm:gap-6 lg:gap-8">
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
              Indlæs flere produkter
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Kan du ikke finde det, du leder efter?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kontakt os, så hjælper vi dig med at finde det perfekte produkt til
            dine behov
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Kontakt os</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/about">Læs mere om os</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16 sm:h-24" />
    </div>
  );
}
