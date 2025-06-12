"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  customerInfoSchema,
  formatCardNumber,
  formatExpiryDate,
  formatPhoneNumber,
  paymentInfoSchema,
  type CustomerInfo,
  type PaymentInfo,
} from "@/lib/validations/checkout";
import { AlertCircle, Calendar, CreditCard, Phone, User } from "lucide-react";
import { useState } from "react";
import { ZodError } from "zod";

interface CheckoutFormProps {
  step: "shipping" | "payment";
  onDataChange: (data: CustomerInfo | PaymentInfo) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function CheckoutForm({
  step,
  onDataChange,
  onValidationChange,
}: CheckoutFormProps) {
  const [customerData, setCustomerData] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Danmark",
  });

  const [paymentData, setPaymentData] = useState<PaymentInfo>({
    method: "card",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAllFields = () => {
    try {
      if (step === "shipping") {
        customerInfoSchema.parse(customerData);
        setErrors({});
        onValidationChange(true);
        return true;
      } else if (step === "payment") {
        paymentInfoSchema.parse(paymentData);
        setErrors({});
        onValidationChange(true);
        return true;
      }
    } catch (error) {
      const newErrors: Record<string, string> = {};
      if (error instanceof ZodError) {
        error.errors?.forEach((err) => {
          if (err.path?.[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
      }
      setErrors(newErrors);
      onValidationChange(false);
      return false;
    }
    return false;
  };

  const handleCustomerChange = (name: keyof CustomerInfo, value: string) => {
    const newData = { ...customerData, [name]: value };
    setCustomerData(newData);
    onDataChange(newData);

    // Clear error for this field if it exists
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    // Validate all fields after a short delay
    setTimeout(() => validateAllFields(), 300);
  };

  const handlePaymentChange = (
    name: keyof PaymentInfo,
    value: string | boolean
  ) => {
    const newData = { ...paymentData, [name]: value };
    setPaymentData(newData);
    onDataChange(newData);

    // Clear error for this field if it exists
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    // Validate all fields after a short delay
    setTimeout(() => validateAllFields(), 300);
  };

  if (step === "shipping") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Leveringsoplysninger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Fornavn *</Label>
              <Input
                id="firstName"
                value={customerData.firstName}
                onChange={(e) =>
                  handleCustomerChange("firstName", e.target.value)
                }
                placeholder="Indtast dit fornavn"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.firstName}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Efternavn *</Label>
              <Input
                id="lastName"
                value={customerData.lastName}
                onChange={(e) =>
                  handleCustomerChange("lastName", e.target.value)
                }
                placeholder="Indtast dit efternavn"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={customerData.email}
              onChange={(e) => handleCustomerChange("email", e.target.value)}
              placeholder="din@email.dk"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              value={customerData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                handleCustomerChange("phone", formatted);
              }}
              placeholder="+45 12 34 56 78"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.phone}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse *</Label>
            <Input
              id="address"
              value={customerData.address}
              onChange={(e) => handleCustomerChange("address", e.target.value)}
              placeholder="Gade og husnummer"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.address}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postnummer *</Label>
              <Input
                id="postalCode"
                value={customerData.postalCode}
                onChange={(e) =>
                  handleCustomerChange("postalCode", e.target.value)
                }
                placeholder="1234"
                maxLength={4}
                className={errors.postalCode ? "border-red-500" : ""}
              />
              {errors.postalCode && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.postalCode}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">By *</Label>
              <Input
                id="city"
                value={customerData.city}
                onChange={(e) => handleCustomerChange("city", e.target.value)}
                placeholder="København"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.city}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "payment") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Betalingsmetode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <RadioGroup
              value={paymentData.method}
              onValueChange={(value) => handlePaymentChange("method", value)}
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
          </div>

          {paymentData.method === "card" && (
            <div className="space-y-4 p-4 border rounded-lg bg-accent/5">
              <h4 className="font-medium">Kortoplysninger</h4>

              <div className="space-y-2">
                <Label htmlFor="cardName">Navn på kort *</Label>
                <Input
                  id="cardName"
                  value={paymentData.cardName}
                  onChange={(e) =>
                    handlePaymentChange("cardName", e.target.value)
                  }
                  placeholder="Som det står på kortet"
                  className={errors.cardName ? "border-red-500" : ""}
                />
                {errors.cardName && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.cardName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Kortnummer *</Label>
                <Input
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    handlePaymentChange("cardNumber", formatted);
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={errors.cardNumber ? "border-red-500" : ""}
                />
                {errors.cardNumber && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.cardNumber}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Udløb *</Label>
                  <Input
                    id="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value);
                      handlePaymentChange("expiryDate", formatted);
                    }}
                    placeholder="MM/ÅÅ"
                    maxLength={5}
                    className={errors.expiryDate ? "border-red-500" : ""}
                  />
                  {errors.expiryDate && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.expiryDate}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC *</Label>
                  <Input
                    id="cvc"
                    value={paymentData.cvc}
                    onChange={(e) => handlePaymentChange("cvc", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className={errors.cvc ? "border-red-500" : ""}
                  />
                  {errors.cvc && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.cvc}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={paymentData.acceptTerms}
                onCheckedChange={(checked) =>
                  handlePaymentChange("acceptTerms", !!checked)
                }
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
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
            {errors.acceptTerms && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.acceptTerms}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
