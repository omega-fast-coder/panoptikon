import { Archive, Film, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OfferSection = () => {
  return (
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
            Sjældne optagelser fra DDR, danske TV-produktioner og dokumentarisk
            materiale fra en svunden tid.
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
  );
};

export default OfferSection;
