import { Card, CardContent } from "@/components/ui/card";
import { CheckoutStep } from "./checkout-header";
import { ShoppingCart, Truck, CreditCard } from "lucide-react";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const stepIcons: Record<string, typeof ShoppingCart> = {
  cart: ShoppingCart,
  shipping: Truck,
  payment: CreditCard,
};

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {["cart", "shipping", "payment"].map((step, index) => {
            const Icon = stepIcons[step];
            const isActive = step === currentStep;
            const isCompleted =
              (step === "cart" &&
                ["shipping", "payment"].includes(currentStep)) ||
              (step === "shipping" && currentStep === "payment");

            return (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 h-px mx-4 ${
                      isCompleted ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
