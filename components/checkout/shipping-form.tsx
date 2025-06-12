import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { formatPhoneNumber } from "@/components/simple-checkout-validation";

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingFormProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
}

export function ShippingForm({
  customerInfo,
  onCustomerInfoChange,
}: ShippingFormProps) {
  const handleFieldChange = (field: keyof CustomerInfo, value: string) => {
    onCustomerInfoChange({
      ...customerInfo,
      [field]: value,
    });
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleFieldChange("phone", formatted);
  };

  return (
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
                onChange={(e) => handleFieldChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Efternavn *</Label>
              <Input
                id="lastName"
                placeholder="Indtast dit efternavn"
                value={customerInfo.lastName}
                onChange={(e) => handleFieldChange("lastName", e.target.value)}
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
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              placeholder="+45 12 34 56 78"
              value={customerInfo.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="address">Adresse *</Label>
            <Input
              id="address"
              placeholder="Gade og husnummer"
              value={customerInfo.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
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
                  handleFieldChange("postalCode", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="city">By *</Label>
              <Input
                id="city"
                placeholder="København"
                value={customerInfo.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
