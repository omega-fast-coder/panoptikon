"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/cart-provider";
import { useCheckoutValidation } from "@/components/simple-checkout-validation";

// Import all the checkout components
import {
  CheckoutHeader,
  type CheckoutStep,
} from "@/components/checkout/checkout-header";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { CartReview } from "@/components/checkout/cart-review";
import {
  ShippingForm,
  type CustomerInfo,
} from "@/components/checkout/shipping-form";
import {
  PaymentForm,
  type PaymentInfo,
} from "@/components/checkout/payment-form";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { OrderSummary } from "@/components/checkout/order-summary";
import { EmptyCart } from "@/components/checkout/empty-cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Use our validation hook
  const { isCustomerInfoValid, isPaymentInfoValid } = useCheckoutValidation();

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Danmark",
  });

  // Payment info state
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardName: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  // If cart is empty, show empty cart component
  if (items.length === 0 && currentStep !== "confirmation") {
    return <EmptyCart onReturnToShop={() => router.push("/")} />;
  }

  const handleNextStep = () => {
    if (currentStep === "cart") {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      // Validate customer info before proceeding
      const isValid = isCustomerInfoValid(customerInfo);
      if (isValid) {
        setCurrentStep("payment");
      }
    } else if (currentStep === "payment") {
      // Validate payment info before placing order
      const paymentData = { ...paymentInfo, acceptTerms };
      const isValid = isPaymentInfoValid(paymentData);
      if (isValid) {
        handlePlaceOrder();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("cart");
    else router.push("/");
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate fake order number
    const orderNum = `PAN-${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);

    // Clear cart
    clearCart();

    setIsProcessing(false);
    setCurrentStep("confirmation");
  };

  const canProceed = () => {
    if (currentStep === "cart") return items.length > 0;
    if (currentStep === "shipping") {
      return isCustomerInfoValid(customerInfo);
    }
    if (currentStep === "payment") {
      const paymentData = { ...paymentInfo, acceptTerms };
      return isPaymentInfoValid(paymentData);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <CheckoutHeader
        currentStep={currentStep}
        totalItems={totalItems}
        onBack={handlePreviousStep}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            {currentStep !== "confirmation" && (
              <CheckoutProgress currentStep={currentStep} />
            )}

            {/* Step Content */}
            {currentStep === "cart" && (
              <CartReview items={items} totalItems={totalItems} />
            )}

            {currentStep === "shipping" && (
              <ShippingForm
                customerInfo={customerInfo}
                onCustomerInfoChange={setCustomerInfo}
              />
            )}

            {currentStep === "payment" && (
              <PaymentForm
                paymentInfo={paymentInfo}
                onPaymentInfoChange={setPaymentInfo}
                acceptTerms={acceptTerms}
                onAcceptTermsChange={setAcceptTerms}
              />
            )}

            {currentStep === "confirmation" && (
              <OrderConfirmation
                orderNumber={orderNumber}
                customerEmail={customerInfo.email}
                onContinueShopping={() => router.push("/")}
              />
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== "confirmation" && (
            <div className="space-y-6">
              <OrderSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                currentStep={currentStep}
                canProceed={canProceed()}
                isProcessing={isProcessing}
                onNext={handleNextStep}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
