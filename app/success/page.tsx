"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Heart,
  Mail,
  Truck,
  Package,
  ArrowLeft,
} from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            {/* Success Icon */}
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Ordre bekræftet! 🎉
              </h1>
              <p className="text-muted-foreground">
                Tak for din ordre. Vi behandler den nu og sender en bekræftelse
                til din e-mail.
              </p>
            </div>

            {/* Order Number */}
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Ordrenummer
              </div>
              <div className="text-xl font-bold text-foreground">
                {orderNumber}
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Bekræftelse sendt til din e-mail</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Din ordre pakkes inden for 24 timer</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Forventet levering: 2-3 hverdage</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button onClick={() => router.push("/")} className="w-full gap-2">
                <Heart className="h-4 w-4" />
                Fortsæt med at shoppe
              </Button>

              <Button
                variant="outline"
                onClick={() => router.back()}
                className="w-full gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbage
              </Button>
            </div>

            {/* Fun Message */}
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p>🎬 Tak for at bruge Panoptikon!</p>
              <p>Din vintage media oplevelse starter nu.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
