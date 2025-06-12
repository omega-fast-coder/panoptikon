import EmptyState from "@/components/empty-state";
import ProductCard from "@/components/product-card";
import { getCategoryBySlug } from "@/lib/actions/categories";
import { getProductsByCategory } from "@/lib/actions/products";
import {
  CircleHelpIcon,
  TagIcon,
  PackageIcon,
  ArrowLeft,
  Grid3X3,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  const products = await getProductsByCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <EmptyState
            title="Kategori ikke fundet"
            description="Den kategori du leder efter eksisterer ikke eller er blevet flyttet."
            icon={CircleHelpIcon}
          />
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Tilbage til forsiden
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Mobile-optimized Category Header */}
        <div className="relative">
          <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-16 sm:px-6 lg:px-8 sm:pt-16 sm:pb-24">
            {/* Back Button - Mobile First */}
            <div className="mb-6 sm:mb-8">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Tilbage</span>
                </Link>
              </Button>
            </div>

            <div className="text-center space-y-4 sm:space-y-6">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/20">
                <TagIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                Kategori
              </div>

              {/* Category Title */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight px-2">
                {category.name}
              </h1>

              {/* Category Description */}
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Empty State with better mobile layout */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 sm:py-16">
          <div className="max-w-md mx-auto">
            <EmptyState
              title="Ingen produkter endnu"
              description="Denne kategori er tom i øjeblikket, men hold øje - nye produkter kommer snart!"
              icon={PackageIcon}
            />
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Udforsk andre kategorier
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Hero Section - Mobile Optimized */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-12 sm:px-6 lg:px-8 sm:pt-16 sm:pb-20">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Tilbage</span>
              </Link>
            </Button>
          </div>

          <div className="text-center space-y-4 sm:space-y-6">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/20">
              <TagIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              Kategori
            </div>

            {/* Category Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight px-2">
              {category.name}
            </h1>

            {/* Category Description */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
              {category.description}
            </p>

            {/* Product Count with Enhanced Styling */}
            <div className="flex items-center justify-center">
              <Badge
                variant="secondary"
                className="gap-2 px-3 py-1.5 text-xs sm:text-sm"
              >
                <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{products.length} produkter</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
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

      {/* Bottom Spacing */}
      <div className="h-16 sm:h-24" />
    </div>
  );
};

export default CategoryPage;
