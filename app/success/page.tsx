"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// Import all the success components
import { SuccessIcon } from "@/components/success/success-icon";
import { SuccessMessage } from "@/components/success/success-message";
import { OrderNumberDisplay } from "@/components/success/order-number-display";
import { OrderInfo } from "@/components/success/order-info";
import { SuccessActions } from "@/components/success/success-actions";
import { BrandedMessage } from "@/components/success/branded-message";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    // Get order number from URL params or generate a fake one
    const order =
      searchParams.get("order") || `PAN-${Date.now().toString().slice(-6)}`;
    setOrderNumber(order);
  }, [searchParams]);

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            {/* Success Icon */}
            <SuccessIcon />

            {/* Success Message */}
            <SuccessMessage />

            {/* Order Number */}
            <OrderNumberDisplay orderNumber={orderNumber} />

            {/* Order Info */}
            <OrderInfo />

            {/* Actions */}
            <SuccessActions
              onContinueShopping={handleContinueShopping}
              onGoBack={handleGoBack}
            />

            {/* Fun Message */}
            <BrandedMessage />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
