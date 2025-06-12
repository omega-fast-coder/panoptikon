import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Truck, Heart } from "lucide-react";

interface OrderConfirmationProps {
  orderNumber: string;
  customerEmail: string;
  onContinueShopping: () => void;
}

export function OrderConfirmation({
  orderNumber,
  customerEmail,
  onContinueShopping,
}: OrderConfirmationProps) {
  return (
    <Card>
      <CardContent className="p-8 text-center space-y-6">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Tak for din ordre!</h1>
          <p className="text-muted-foreground">
            Din ordre er bekræftet og vi behandler den nu
          </p>
        </div>

        <div className="bg-accent/50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Ordrenummer</div>
          <div className="text-xl font-bold">{orderNumber}</div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>En bekræftelse er sendt til {customerEmail}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>Forventet levering: 2-3 hverdage</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onContinueShopping} className="gap-2">
            <Heart className="h-4 w-4" />
            Fortsæt med at shoppe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
