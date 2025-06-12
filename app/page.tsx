import EmptyState from "@/components/empty-state";
import ProductCard from "@/components/product-card";
import { SearchProducts } from "@/components/search-products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/actions/categories";
import { getProducts } from "@/lib/actions/products";
import {
  Archive,
  Camera,
  Clock,
  Film,
  Headphones,
  PackageIcon,
  PlayCircle,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";

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
      <div className="relative overflow-hidden ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,theme(colors.primary/5),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-16 sm:px-6 lg:px-8 sm:pt-20 sm:pb-24">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Film className="h-4 w-4" />
              Vintage Media Arkiv
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">Autentiske</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  film & lydklip
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-normal mt-2">
                  fra fortiden
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Udforsk vores unikke samling af vintage 8mm filmklip, historiske
                lydoptagelser og nostalgiske TV-klip fra 1950&apos;erne til
                1980&apos;erne. Perfekt til kreative projekter og historiske
                dokumentationer.
              </p>
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border">
                <Archive className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  Historiske optagelser
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border">
                <Camera className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">8mm filmklip</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border">
                <Headphones className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Autentiske lydklip</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="#products">
                  <PlayCircle className="h-4 w-4" />
                  Se vores katalog
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="gap-2">
                <Link href="#about-collection">
                  <Clock className="h-4 w-4" />
                  Læs om samlingen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div
        id="about-collection"
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16"
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Hvad finder du hos os?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vi specialiserer os i vintage media fra en svunden tid
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center space-y-4 p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 mx-auto rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Film className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Vintage Filmklip</h3>
            <p className="text-sm text-muted-foreground">
              Autentiske 8mm optagelser fra 1950&apos;erne til 1980&apos;erne.
              Sort/hvid og farve. Perfekt til kreative projekter.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="text-xs">
                Sort/hvid
              </Badge>
              <Badge variant="secondary" className="text-xs">
                8mm format
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Vintage
              </Badge>
            </div>
          </div>

          <div className="text-center space-y-4 p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 mx-auto rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Headphones className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Historiske Lydklip</h3>
            <p className="text-sm text-muted-foreground">
              Rene lydoptagelser uden baggrundsstøj. Fra naturlyde til vintage
              reklamer og TV-introsekvenser.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="text-xs">
                Naturlyde
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Reklamer
              </Badge>
              <Badge variant="secondary" className="text-xs">
                TV-intro
              </Badge>
            </div>
          </div>

          <div className="text-center space-y-4 p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 mx-auto rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Archive className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Arkivmateriale</h3>
            <p className="text-sm text-muted-foreground">
              Sjældne optagelser fra DDR, danske TV-produktioner og
              dokumentarisk materiale fra en svunden tid.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="text-xs">
                DDR
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Dansk TV
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Dokumentar
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-4 rounded-lg bg-card border">
            <div className="text-2xl font-bold text-primary mb-1">
              {products.length}
            </div>
            <div className="text-sm text-muted-foreground">Unikke klip</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-card border">
            <div className="text-2xl font-bold text-primary mb-1">
              1950-1980
            </div>
            <div className="text-sm text-muted-foreground">Tidsperiode</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-card border">
            <div className="text-2xl font-bold text-primary mb-1">8mm</div>
            <div className="text-sm text-muted-foreground">Film format</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-card border">
            <div className="text-2xl font-bold text-primary mb-1">✓</div>
            <div className="text-sm text-muted-foreground">Autentisk</div>
          </div>
        </div>
      </div>

      {/* Search Section */}
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

      {/* All Products Section */}
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

      {/* Featured Categories */}
      {categories && categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Udforsk efter kategori
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fra naturscener til historiske reklamer - find det du leder efter
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                    {index % 3 === 0 ? (
                      <Film className="h-6 w-6" />
                    ) : index % 3 === 1 ? (
                      <Headphones className="h-6 w-6" />
                    ) : (
                      <Camera className="h-6 w-6" />
                    )}
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
        </div>
      )}

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Leder du efter et specifikt klip?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vi har adgang til et stort arkiv af vintage materiale. Kontakt os
            hvis du leder efter noget særligt - vi hjælper gerne!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                <Archive className="h-4 w-4" />
                Kontakt os
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="gap-2">
              <Link href="/about">
                <Clock className="h-4 w-4" />
                Om vores arkiv
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16 sm:h-24" />
    </div>
  );
}
