import EmptyState from "@/components/empty-state";
import ProductCard from "@/components/product-card";
import { getCategoryBySlug } from "@/lib/actions/categories";
import { getProductsByCategory } from "@/lib/actions/products";
import { CircleHelpIcon, TagIcon, PackageIcon } from "lucide-react";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  const products = await getProductsByCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Kategori ikke fundet"
          description="Den kategori du leder efter eksisterer ikke eller er blevet flyttet."
          icon={CircleHelpIcon}
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Category Header */}
        <div className="bg-gradient-to-br from-background via-background/95 to-muted/20">
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TagIcon className="h-4 w-4" />
                Kategori
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                {category.name}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <EmptyState
            title="Ingen produkter endnu"
            description="Denne kategori er tom i øjeblikket, men hold øje - nye produkter kommer snart!"
            icon={PackageIcon}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <TagIcon className="h-4 w-4" />
              Kategori
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {category.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <PackageIcon className="h-4 w-4" />
              <span>{products.length} produkter tilgængelige</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </div>
  );
};

export default CategoryPage;
