import type {
  ValidationError,
  ValidationRule,
  ValidationValue,
} from "../types.js";

const e164PhoneNumberRegex = /^\+[1-9]\d{7,14}$/;
const whitespaceRegex = /\s/;
const letterRegex = /[A-Za-z]/;

const invalidTypeError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Value must be a string.",
  code: "INVALID_TYPE",
};

const missingPlusSignError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Phone number must start with a plus sign.",
  code: "PHONE_MISSING_PLUS_SIGN",
};

const phoneNumberContainsLettersError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Phone number must not contain letters.",
  code: "PHONE_CONTAINS_LETTERS",
};

const phoneNumberContainsSpacesError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Phone number must not contain spaces.",
  code: "PHONE_CONTAINS_SPACES",
};

const phoneNumberTooShortError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Phone number is too short for E.164 format.",
  code: "PHONE_TOO_SHORT",
};

const phoneNumberTooLongError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Phone number is too long for E.164 format.",
  code: "PHONE_TOO_LONG",
};

const invalidPhoneNumberFormatError: ValidationError = {
  rule: "isPhoneNumber",
  message: "Phone number must use E.164 format.",
  code: "INVALID_PHONE_NUMBER_FORMAT",
};

export const isPhoneNumber: ValidationRule = (
  value: ValidationValue,
): ValidationError[] => {
  if (typeof value !== "string") {
    return [invalidTypeError];
  }

  const errors: ValidationError[] = [];

  if (!value.startsWith("+")) {
    errors.push(missingPlusSignError);
  }

  if (letterRegex.test(value)) {
    errors.push(phoneNumberContainsLettersError);
  }

  if (whitespaceRegex.test(value)) {
    errors.push(phoneNumberContainsSpacesError);
  }

 const digitsOnly = value.startsWith("+")
  ? value.slice(1)
  : value;

  if (digitsOnly.length < 8) {
    errors.push(phoneNumberTooShortError);
  }

  if (digitsOnly.length > 15) {
    errors.push(phoneNumberTooLongError);
  }

  if (errors.length > 0) {
    return errors;
  }

  if (!e164PhoneNumberRegex.test(value)) {
    return [invalidPhoneNumberFormatError];
  }

  return [];
};