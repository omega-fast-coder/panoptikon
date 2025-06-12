import { SerializedProduct } from "@/lib/types";

const Stats = ({ products }: { products: SerializedProduct[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center p-4 rounded-lg bg-card border">
          <div className="text-2xl font-bold text-primary mb-1">
            {products.length}
          </div>
          <div className="text-sm text-muted-foreground">Unikke klip</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-card border">
          <div className="text-2xl font-bold text-primary mb-1">1950-1980</div>
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
  );
};

export default Stats;
