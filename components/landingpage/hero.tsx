import {
  Archive,
  Camera,
  Clock,
  Film,
  Headphones,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
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
              <span className="text-sm font-medium">Historiske optagelser</span>
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
  );
};

export default Hero;
