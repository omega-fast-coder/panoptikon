import { getCategoryBySlug } from "@/lib/actions/categories";
import { getProductsByCategory } from "@/lib/actions/products";

// Import all the category components
import { CategoryNotFound } from "@/components/category/category-not-found";
import { CategoryHeader } from "@/components/category/category-header";
import { EmptyProducts } from "@/components/category/empty-products";
import { ProductsGrid } from "@/components/category/products-grid";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  const products = await getProductsByCategory(slug);

  // Category not found
  if (!category) {
    return <CategoryNotFound />;
  }

  // Category exists but no products
  if (!products || products.length === 0) {
    return <EmptyProducts category={category} />;
  }

  // Category with products
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Hero Section - Mobile Optimized */}
      <CategoryHeader category={category} productCount={products.length} />

      {/* Products Section */}
      <ProductsGrid products={products} />

      {/* Bottom Spacing */}
      <div className="h-16 sm:h-24" />
    </div>
  );
};

export default CategoryPage;
