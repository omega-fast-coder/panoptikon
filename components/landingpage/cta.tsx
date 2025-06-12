import { Archive, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
      <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Leder du efter et specifikt klip?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Vi har adgang til et stort arkiv af vintage materiale. Kontakt os hvis
          du leder efter noget særligt - vi hjælper gerne!
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
  );
};

export default CTA;
