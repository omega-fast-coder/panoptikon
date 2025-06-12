import { Badge } from "@/components/ui/badge";
import { TagIcon, Grid3X3 } from "lucide-react";
import { BackButton } from "./back-button";

interface Category {
  name: string;
  description: string;
}

interface CategoryHeaderProps {
  category: Category;
  productCount: number;
}

export function CategoryHeader({
  category,
  productCount,
}: CategoryHeaderProps) {
  return (
    <div className="relative">
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-12 sm:px-6 lg:px-8 sm:pt-16 sm:pb-20">
        {/* Back Button */}
        <BackButton />

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
              <span>{productCount} produkter</span>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
