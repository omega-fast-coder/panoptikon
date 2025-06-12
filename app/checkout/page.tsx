"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCheckoutValidation,
  formatPhoneNumber,
} from "@/components/simple-checkout-validation";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  User,
  CreditCard,
  CheckCircle,
  Truck,
  Mail,
  Phone,
  Calendar,
  Shield,
  Heart,
} from "lucide-react";
import Image from "next/image";

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  method: "card" | "mobilepay" | "klarna";
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardName: string;
}

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

  // If cart is empty, redirect to home
  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Din kurv er tom</h1>
          <p className="text-muted-foreground">
            Tilføj nogle produkter før du går til checkout
          </p>
          <Button onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Fortsæt med at shoppe
          </Button>
        </div>
      </div>
    );
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

  const stepTitles = {
    cart: "Gennemgå kurv",
    shipping: "Leveringsoplysninger",
    payment: "Betaling",
    confirmation: "Ordrebekræftelse",
  };

  const stepIcons = {
    cart: ShoppingCart,
    shipping: Truck,
    payment: CreditCard,
    confirmation: CheckCircle,
  };

  const CurrentIcon = stepIcons[currentStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousStep}
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            {currentStep !== "confirmation" && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {["cart", "shipping", "payment"].map((step, index) => {
                      const Icon = stepIcons[step as CheckoutStep];
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
            )}

            {/* Step Content */}
            {currentStep === "cart" && (
              <Card>
                <CardHeader>
                  <CardTitle>Din kurv ({totalItems} varer)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">
                            Antal: {item.quantity}
                          </span>
                          <span className="font-semibold">
                            {(item.price * item.quantity).toFixed(2)},- kr.
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {currentStep === "shipping" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Leveringsoplysninger
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Fornavn *</Label>
                        <Input
                          id="firstName"
                          placeholder="Indtast dit fornavn"
                          value={customerInfo.firstName}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Efternavn *</Label>
                        <Input
                          id="lastName"
                          placeholder="Indtast dit efternavn"
                          value={customerInfo.lastName}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="din@email.dk"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefonnummer</Label>
                      <Input
                        id="phone"
                        placeholder="+45 12 34 56 78"
                        value={customerInfo.phone}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          setCustomerInfo({
                            ...customerInfo,
                            phone: formatted,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        placeholder="Gade og husnummer"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Postnummer *</Label>
                        <Input
                          id="postalCode"
                          placeholder="1234"
                          maxLength={4}
                          value={customerInfo.postalCode}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              postalCode: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">By *</Label>
                        <Input
                          id="city"
                          placeholder="København"
                          value={customerInfo.city}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Betalingsmetode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={paymentInfo.method}
                    onValueChange={(value) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        method: value as PaymentInfo["method"],
                      })
                    }
                  >
                    <div className="space-y-3">
                      <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="card" />
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <div className="font-medium">Betalingskort</div>
                          <div className="text-sm text-muted-foreground">
                            Visa, Mastercard, Dankort
                          </div>
                        </div>
                      </Label>

                      <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="mobilepay" />
                        <Phone className="h-5 w-5" />
                        <div>
                          <div className="font-medium">MobilePay</div>
                          <div className="text-sm text-muted-foreground">
                            Betal med din telefon
                          </div>
                        </div>
                      </Label>

                      <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="klarna" />
                        <Calendar className="h-5 w-5" />
                        <div>
                          <div className="font-medium">Klarna</div>
                          <div className="text-sm text-muted-foreground">
                            Betal senere eller i rater
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentInfo.method === "card" && (
                    <div className="space-y-4 p-4 border rounded-lg bg-accent/5">
                      <h4 className="font-medium">Kortoplysninger</h4>
                      <div>
                        <Label htmlFor="cardName">Navn på kort *</Label>
                        <Input
                          id="cardName"
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardName: e.target.value,
                            })
                          }
                          placeholder="Som det står på kortet"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Kortnummer *</Label>
                        <Input
                          id="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: e.target.value,
                            })
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Udløb *</Label>
                          <Input
                            id="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                expiryDate: e.target.value,
                              })
                            }
                            placeholder="MM/ÅÅ"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC *</Label>
                          <Input
                            id="cvc"
                            value={paymentInfo.cvc}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvc: e.target.value,
                              })
                            }
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm leading-relaxed"
                      >
                        Jeg accepterer{" "}
                        <button className="text-primary underline">
                          handelsbetingelserne
                        </button>{" "}
                        og{" "}
                        <button className="text-primary underline">
                          privatlivspolitikken
                        </button>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "confirmation" && (
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
                    <div className="text-sm text-muted-foreground mb-1">
                      Ordrenummer
                    </div>
                    <div className="text-xl font-bold">{orderNumber}</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>
                        En bekræftelse er sendt til {customerInfo.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>Forventet levering: 2-3 hverdage</span>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => router.push("/")} className="gap-2">
                      <Heart className="h-4 w-4" />
                      Fortsæt med at shoppe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== "confirmation" && (
            <div className="space-y-6">
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
                    onClick={handleNextStep}
                    disabled={!canProceed() || isProcessing}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
