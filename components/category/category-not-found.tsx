import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { CircleHelpIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CategoryNotFound() {
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
