import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";

interface SuccessActionsProps {
  onContinueShopping: () => void;
  onGoBack: () => void;
  continueShoppingText?: string;
  goBackText?: string;
}

export function SuccessActions({
  onContinueShopping,
  onGoBack,
  continueShoppingText = "Fortsæt med at shoppe",
  goBackText = "Tilbage",
}: SuccessActionsProps) {
  return (
    <div className="space-y-3 pt-4">
      <Button onClick={onContinueShopping} className="w-full gap-2">
        <Heart className="h-4 w-4" />
        {continueShoppingText}
      </Button>

      <Button variant="outline" onClick={onGoBack} className="w-full gap-2">
        <ArrowLeft className="h-4 w-4" />
        {goBackText}
      </Button>
    </div>
  );
}
