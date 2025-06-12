import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Phone, Calendar } from "lucide-react";

export interface PaymentInfo {
  method: "card" | "mobilepay" | "klarna";
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardName: string;
}

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onPaymentInfoChange: (info: PaymentInfo) => void;
  acceptTerms: boolean;
  onAcceptTermsChange: (accepted: boolean) => void;
}

export function PaymentForm({
  paymentInfo,
  onPaymentInfoChange,
  acceptTerms,
  onAcceptTermsChange,
}: PaymentFormProps) {
  const handleFieldChange = (field: keyof PaymentInfo, value: string) => {
    onPaymentInfoChange({
      ...paymentInfo,
      [field]: value,
    });
  };

  return (
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
            handleFieldChange("method", value as PaymentInfo["method"])
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
                onChange={(e) => handleFieldChange("cardName", e.target.value)}
                placeholder="Som det står på kortet"
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Kortnummer *</Label>
              <Input
                id="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) =>
                  handleFieldChange("cardNumber", e.target.value)
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
                    handleFieldChange("expiryDate", e.target.value)
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
                  onChange={(e) => handleFieldChange("cvc", e.target.value)}
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
              onCheckedChange={(checked) => onAcceptTermsChange(!!checked)}
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
        </div>
      </CardContent>
    </Card>
  );
}
