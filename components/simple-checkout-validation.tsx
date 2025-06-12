"use client";

import { useState } from "react";

// Type definitions for form data
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
  acceptTerms: boolean;
}

// Simple validation hook
export function useCheckoutValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Danish postal code validation (4 digits)
  const danishPostalCodeRegex = /^\d{4}$/;

  // Danish phone number validation (basic)
  const danishPhoneRegex = /^(\+45\s?)?(\d{2}\s?\d{2}\s?\d{2}\s?\d{2}|\d{8})$/;

  // Credit card validation (basic)
  const creditCardRegex = /^[\d\s]{13,19}$/;

  // CVC validation
  const cvcRegex = /^\d{3,4}$/;

  // Expiry date validation (MM/YY format)
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  // Pure validation function that doesn't cause side effects
  const getCustomerInfoErrors = (
    data: CustomerInfo
  ): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!data.firstName) {
      newErrors.firstName = "Fornavn er påkrævet";
    } else if (data.firstName.length < 2) {
      newErrors.firstName = "Fornavn skal være mindst 2 tegn";
    } else if (!/^[a-zA-ZæøåÆØÅ\s-]+$/.test(data.firstName)) {
      newErrors.firstName =
        "Fornavn må kun indeholde bogstaver, mellemrum og bindestreg";
    }

    // Last name validation
    if (!data.lastName) {
      newErrors.lastName = "Efternavn er påkrævet";
    } else if (data.lastName.length < 2) {
      newErrors.lastName = "Efternavn skal være mindst 2 tegn";
    } else if (!/^[a-zA-ZæøåÆØÅ\s-]+$/.test(data.lastName)) {
      newErrors.lastName =
        "Efternavn må kun indeholde bogstaver, mellemrum og bindestreg";
    }

    // Email validation
    if (!data.email) {
      newErrors.email = "E-mail er påkrævet";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Indtast en gyldig e-mail adresse";
    }

    // Phone validation (optional)
    if (data.phone && !danishPhoneRegex.test(data.phone)) {
      newErrors.phone = "Indtast et gyldigt dansk telefonnummer";
    }

    // Address validation
    if (!data.address) {
      newErrors.address = "Adresse er påkrævet";
    } else if (data.address.length < 5) {
      newErrors.address = "Adresse skal være mindst 5 tegn";
    }

    // City validation
    if (!data.city) {
      newErrors.city = "By er påkrævet";
    } else if (!/^[a-zA-ZæøåÆØÅ\s-]+$/.test(data.city)) {
      newErrors.city = "By må kun indeholde bogstaver, mellemrum og bindestreg";
    }

    // Postal code validation
    if (!data.postalCode) {
      newErrors.postalCode = "Postnummer er påkrævet";
    } else if (!danishPostalCodeRegex.test(data.postalCode)) {
      newErrors.postalCode = "Postnummer skal være 4 cifre";
    }

    return newErrors;
  };

  // Pure validation function that doesn't cause side effects
  const getPaymentInfoErrors = (data: PaymentInfo): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // Terms validation
    if (!data.acceptTerms) {
      newErrors.acceptTerms =
        "Du skal acceptere handelsbetingelserne for at fortsætte";
    }

    // Card validation (only if card method is selected)
    if (data.method === "card") {
      if (!data.cardName) {
        newErrors.cardName = "Navn på kort er påkrævet";
      } else if (!/^[a-zA-ZæøåÆØÅ\s-]+$/.test(data.cardName)) {
        newErrors.cardName =
          "Navn må kun indeholde bogstaver, mellemrum og bindestreg";
      }

      if (!data.cardNumber) {
        newErrors.cardNumber = "Kortnummer er påkrævet";
      } else {
        const cleanCardNumber = data.cardNumber.replace(/\s/g, "");
        if (!creditCardRegex.test(data.cardNumber)) {
          newErrors.cardNumber = "Indtast et gyldigt kortnummer";
        } else {
          // Basic Luhn algorithm check
          const digits = cleanCardNumber.split("").map(Number);
          let sum = 0;
          let isEven = false;

          for (let i = digits.length - 1; i >= 0; i--) {
            let digit = digits[i];

            if (isEven) {
              digit *= 2;
              if (digit > 9) {
                digit -= 9;
              }
            }

            sum += digit;
            isEven = !isEven;
          }

          if (sum % 10 !== 0) {
            newErrors.cardNumber = "Indtast et gyldigt kortnummer";
          }
        }
      }

      if (!data.expiryDate) {
        newErrors.expiryDate = "Udløbsdato er påkrævet";
      } else if (!expiryDateRegex.test(data.expiryDate)) {
        newErrors.expiryDate = "Indtast udløbsdato i format MM/ÅÅ";
      } else {
        const [month, year] = data.expiryDate.split("/").map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          newErrors.expiryDate = "Kortet er udløbet";
        }
      }

      if (!data.cvc) {
        newErrors.cvc = "CVC er påkrævet";
      } else if (!cvcRegex.test(data.cvc)) {
        newErrors.cvc = "CVC skal være 3-4 cifre";
      }
    }

    return newErrors;
  };

  // Validation functions that update state (for use in forms)
  const validateCustomerInfo = (data: CustomerInfo) => {
    const newErrors = getCustomerInfoErrors(data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentInfo = (data: PaymentInfo) => {
    const newErrors = getPaymentInfoErrors(data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pure validation functions for checking validity without side effects
  const isCustomerInfoValid = (data: CustomerInfo) => {
    const errors = getCustomerInfoErrors(data);
    return Object.keys(errors).length === 0;
  };

  const isPaymentInfoValid = (data: PaymentInfo) => {
    const errors = getPaymentInfoErrors(data);
    return Object.keys(errors).length === 0;
  };

  const validateField = (
    fieldName: string,
    value: string | boolean,
    allData: CustomerInfo | PaymentInfo,
    step: "shipping" | "payment"
  ) => {
    if (step === "shipping") {
      const tempData = { ...allData, [fieldName]: value } as CustomerInfo;
      validateCustomerInfo(tempData);
    } else if (step === "payment") {
      const tempData = { ...allData, [fieldName]: value } as PaymentInfo;
      validatePaymentInfo(tempData);
    }
  };

  return {
    errors,
    validateCustomerInfo,
    validatePaymentInfo,
    isCustomerInfoValid,
    isPaymentInfoValid,
    validateField,
    clearErrors: () => setErrors({}),
  };
}

// Utility functions for formatting
export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return v;
  }
};

export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\D/g, "");

  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }

  return v;
};

export const formatPhoneNumber = (value: string): string => {
  const v = value.replace(/[^0-9+]/g, "");

  if (v.startsWith("+45")) {
    const digits = v.substring(3);
    const parts = [];
    for (let i = 0; i < digits.length && i < 8; i += 2) {
      parts.push(digits.substring(i, i + 2));
    }
    return `+45 ${parts.join(" ")}`;
  }

  if (v.length === 8) {
    const parts = [];
    for (let i = 0; i < v.length; i += 2) {
      parts.push(v.substring(i, i + 2));
    }
    return parts.join(" ");
  }

  return v;
};
