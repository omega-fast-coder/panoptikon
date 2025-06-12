import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

interface CheckoutHeaderProps {
  currentStep: CheckoutStep;
  totalItems: number;
  onBack: () => void;
}

const stepTitles = {
  cart: "Gennemgå kurv",
  shipping: "Leveringsoplysninger",
  payment: "Betaling",
  confirmation: "Ordrebekræftelse",
};

const stepIcons = {
  cart: ShoppingCart,
  shipping: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  payment: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  ),
  confirmation: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export function CheckoutHeader({
  currentStep,
  totalItems,
  onBack,
}: CheckoutHeaderProps) {
  const CurrentIcon = stepIcons[currentStep];

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === "cart" ? "Tilbage til shop" : "Tilbage"}
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">
                {stepTitles[currentStep]}
              </h1>
            </div>
          </div>

          {currentStep !== "confirmation" && (
            <Badge variant="secondary" className="gap-2">
              <ShoppingCart className="h-3 w-3" />
              {totalItems} varer
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
