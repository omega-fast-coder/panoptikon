import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
  className?: string;
}

export function BackButton({ href = "/", className = "" }: BackButtonProps) {
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <Link href={href}>
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Tilbage</span>
        </Link>
      </Button>
    </div>
  );
}
