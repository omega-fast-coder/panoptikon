import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { PackageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CategoryHeader } from "./category-header";

interface Category {
  name: string;
  description: string;
}

interface EmptyProductsProps {
  category: Category;
}

export function EmptyProducts({ category }: EmptyProductsProps) {
  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <CategoryHeader category={category} productCount={0} />

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
