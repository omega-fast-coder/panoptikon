import { ProductsCategories } from "@/lib/generated/prisma";
import { Film, Headphones, Camera } from "lucide-react";
import Link from "next/link";

const FeaturedCategories = ({
  categories,
}: {
  categories: ProductsCategories[];
}) => {
  return (
    <div>
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
    </div>
  );
};

export default FeaturedCategories;
