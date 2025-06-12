import { z } from "zod";

// Danish postal code validation (4 digits)
const danishPostalCodeRegex = /^\d{4}$/;

// Danish phone number validation (basic)
const danishPhoneRegex = /^(\+45\s?)?(\d{2}\s?\d{2}\s?\d{2}\s?\d{2}|\d{8})$/;

// Credit card validation (basic Luhn algorithm check)
const creditCardRegex = /^[\d\s]{13,19}$/;

// CVC validation
const cvcRegex = /^\d{3,4}$/;

// Expiry date validation (MM/YY format)
const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

/**
 * Customer information validation schema
 */
export const customerInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "Fornavn er påkrævet")
    .min(2, "Fornavn skal være mindst 2 tegn")
    .max(50, "Fornavn må ikke være længere end 50 tegn")
    .regex(
      /^[a-zA-ZæøåÆØÅ\s-]+$/,
      "Fornavn må kun indeholde bogstaver, mellemrum og bindestreg"
    ),

  lastName: z
    .string()
    .min(1, "Efternavn er påkrævet")
    .min(2, "Efternavn skal være mindst 2 tegn")
    .max(50, "Efternavn må ikke være længere end 50 tegn")
    .regex(
      /^[a-zA-ZæøåÆØÅ\s-]+$/,
      "Efternavn må kun indeholde bogstaver, mellemrum og bindestreg"
    ),

  email: z
    .string()
    .min(1, "E-mail er påkrævet")
    .email("Indtast en gyldig e-mail adresse")
    .max(100, "E-mail må ikke være længere end 100 tegn"),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || danishPhoneRegex.test(val), {
      message:
        "Indtast et gyldigt dansk telefonnummer (f.eks. +45 12 34 56 78 eller 12345678)",
    }),

  address: z
    .string()
    .min(1, "Adresse er påkrævet")
    .min(5, "Adresse skal være mindst 5 tegn")
    .max(100, "Adresse må ikke være længere end 100 tegn"),

  city: z
    .string()
    .min(1, "By er påkrævet")
    .min(2, "By skal være mindst 2 tegn")
    .max(50, "By må ikke være længere end 50 tegn")
    .regex(
      /^[a-zA-ZæøåÆØÅ\s-]+$/,
      "By må kun indeholde bogstaver, mellemrum og bindestreg"
    ),

  postalCode: z
    .string()
    .min(1, "Postnummer er påkrævet")
    .regex(danishPostalCodeRegex, "Postnummer skal være 4 cifre"),

  country: z.string().min(1, "Land er påkrævet").default("Danmark"),
});

/**
 * Payment method validation schema
 */
export const paymentMethodSchema = z.object({
  method: z.enum(["card", "mobilepay", "klarna"], {
    required_error: "Vælg en betalingsmetode",
  }),
});

/**
 * Credit card validation schema
 */
export const creditCardSchema = z.object({
  cardName: z
    .string()
    .min(1, "Navn på kort er påkrævet")
    .min(2, "Navn skal være mindst 2 tegn")
    .max(100, "Navn må ikke være længere end 100 tegn")
    .regex(
      /^[a-zA-ZæøåÆØÅ\s-]+$/,
      "Navn må kun indeholde bogstaver, mellemrum og bindestreg"
    ),

  cardNumber: z
    .string()
    .min(1, "Kortnummer er påkrævet")
    .regex(creditCardRegex, "Indtast et gyldigt kortnummer")
    .transform((val) => val.replace(/\s/g, "")) // Remove spaces
    .refine((val) => {
      // Basic Luhn algorithm check
      const digits = val.split("").map(Number);
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

      return sum % 10 === 0;
    }, "Indtast et gyldigt kortnummer"),

  expiryDate: z
    .string()
    .min(1, "Udløbsdato er påkrævet")
    .regex(expiryDateRegex, "Indtast udløbsdato i format MM/ÅÅ")
    .refine((val) => {
      const [month, year] = val.split("/").map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
      const currentMonth = currentDate.getMonth() + 1; // 0-indexed to 1-indexed

      // Check if year is in the future, or if year is current year and month is current month or later
      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    }, "Kortet er udløbet"),

  cvc: z
    .string()
    .min(1, "CVC er påkrævet")
    .regex(cvcRegex, "CVC skal være 3-4 cifre"),
});

/**
 * Terms and conditions validation
 */
export const termsSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Du skal acceptere handelsbetingelserne for at fortsætte",
  }),
});

/**
 * Combined payment validation schema that validates based on payment method
 */
export const paymentInfoSchema = z
  .object({
    method: z.enum(["card", "mobilepay", "klarna"]),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    acceptTerms: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // Validate terms acceptance
    if (!data.acceptTerms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Du skal acceptere handelsbetingelserne for at fortsætte",
        path: ["acceptTerms"],
      });
    }

    // If payment method is card, validate card details
    if (data.method === "card") {
      const cardValidation = creditCardSchema.safeParse({
        cardName: data.cardName,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvc: data.cvc,
      });

      if (!cardValidation.success) {
        cardValidation.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: issue.path,
          });
        });
      }
    }
  });

/**
 * Complete checkout validation schema
 */
export const checkoutSchema = z.object({
  customerInfo: customerInfoSchema,
  paymentInfo: paymentInfoSchema,
});

/**
 * TypeScript types derived from schemas
 */
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CreditCard = z.infer<typeof creditCardSchema>;
export type PaymentInfo = z.infer<typeof paymentInfoSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;

/**
 * Utility function to format card number with spaces
 */
export const formatCardNumber = (value: string): string => {
  // Remove all non-digits
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

  // Add spaces every 4 digits
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

/**
 * Utility function to format expiry date
 */
export const formatExpiryDate = (value: string): string => {
  // Remove all non-digits
  const v = value.replace(/\D/g, "");

  // Add slash after 2 digits
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }

  return v;
};

/**
 * Utility function to format Danish phone number
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits and plus
  const v = value.replace(/[^0-9+]/g, "");

  // If starts with +45, format as +45 XX XX XX XX
  if (v.startsWith("+45")) {
    const digits = v.substring(3);
    const parts = [];
    for (let i = 0; i < digits.length && i < 8; i += 2) {
      parts.push(digits.substring(i, i + 2));
    }
    return `+45 ${parts.join(" ")}`;
  }

  // If 8 digits, format as XX XX XX XX
  if (v.length === 8) {
    const parts = [];
    for (let i = 0; i < v.length; i += 2) {
      parts.push(v.substring(i, i + 2));
    }
    return parts.join(" ");
  }

  return v;
};
