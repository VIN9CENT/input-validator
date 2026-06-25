import type { ValidationError, ValidationRule, ValidationValue } from "../types.js";

const minimumPasswordLength = 8;
const uppercaseLetterRegex = /[A-Z]/;
const digitRegex = /\d/;
const specialCharacterRegex = /[^A-Za-z0-9]/;

const passwordTooShortError: ValidationError = {
  rule: "isStrongPassword",
  message: "Password must be at least 8 characters long.",
  code: "PASSWORD_TOO_SHORT",
};

const invalidTypeError: ValidationError = {
  rule: "isStrongPassword",
  message: "Invalid input: Password must be text.",
  code: "INVALID_TYPE",
};

const missingUppercaseError: ValidationError = {
  rule: "isStrongPassword",
  message: "Password must contain at least one uppercase letter.",
  code: "PASSWORD_MISSING_UPPERCASE",
};
const missingDigitError: ValidationError = {
  rule: "isStrongPassword",
  message: "Password must include at least one digit.",
  code: "PASSWORD_MISSING_DIGIT",
};

const missingSpecialCharacterError: ValidationError = {
  rule: "isStrongPassword",
  message: "Password must include at least one special character.",
  code: "PASSWORD_MISSING_SPECIAL_CHARACTER",
};

export const isStrongPassword: ValidationRule = (value: ValidationValue): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (typeof value !== "string") {
    return [invalidTypeError];
  }
  if (value.length < minimumPasswordLength) {
    errors.push(passwordTooShortError);
  }
  if (!uppercaseLetterRegex.test(value)) {
    errors.push(missingUppercaseError);
  }
  if (!digitRegex.test(value)) {
    errors.push(missingDigitError);
  }
  if (!specialCharacterRegex.test(value)) {
    errors.push(missingSpecialCharacterError);
  }

  return errors;
};
