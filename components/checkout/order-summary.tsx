import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Shield } from "lucide-react";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  currentStep: "cart" | "shipping" | "payment" | "confirmation";
  canProceed: boolean;
  isProcessing: boolean;
  onNext: () => void;
}

export function OrderSummary({
  totalItems,
  totalPrice,
  currentStep,
  canProceed,
  isProcessing,
  onNext,
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ordresammendrag</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({totalItems} varer)</span>
            <span>{totalPrice.toFixed(2)},- kr.</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fragt</span>
            <span className="text-green-600">Gratis</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Moms (25%)</span>
            <span>{(totalPrice * 0.2).toFixed(2)},- kr.</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)},- kr.</span>
        </div>

        <Button
          size="lg"
          className="w-full gap-2"
          onClick={onNext}
          disabled={!canProceed || isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Behandler...
            </>
          ) : (
            <>
              {currentStep === "payment" ? (
                <>
                  <Shield className="h-4 w-4" />
                  Bekræft ordre
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  Fortsæt
                </>
              )}
            </>
          )}
        </Button>

        <div className="text-xs text-center text-muted-foreground space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Sikker betaling med SSL-kryptering</span>
          </div>
          <div>Demo checkout - ingen rigtig betaling</div>
        </div>
      </CardContent>
    </Card>
  );
}
