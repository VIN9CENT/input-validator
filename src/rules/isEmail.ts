import type {
  ValidationError,
  ValidationRule,
  ValidationValue,
} from "../types.js";

const invalidTypeError: ValidationError = {
  rule: "isEmail",
  message: "Value must be a string.",
  code: "INVALID_TYPE",
};

const emailContainsSpacesError: ValidationError = {
  rule: "isEmail",
  message: "Email address must not contain spaces.",
  code: "EMAIL_CONTAINS_SPACES",
};

const missingAtSymbolError: ValidationError = {
  rule: "isEmail",
  message: "Email address must include an @ symbol.",
  code: "EMAIL_MISSING_AT_SYMBOL",
};

const missingLocalPartError: ValidationError = {
  rule: "isEmail",
  message: "Email address must include text before the @ symbol.",
  code: "EMAIL_MISSING_LOCAL_PART",
};

const missingDomainError: ValidationError = {
  rule: "isEmail",
  message: "Email address must include a domain after the @ symbol.",
  code: "EMAIL_MISSING_DOMAIN",
};

const invalidEmailFormatError: ValidationError = {
  rule: "isEmail",
  message: "Email address must be in a valid format.",
  code: "INVALID_EMAIL_FORMAT",
};

const whitespaceRegex = /\s/;
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail: ValidationRule = (
  value: ValidationValue,
): ValidationError[] => {
  if (typeof value !== "string") {
    return [invalidTypeError];
  }

  const errors: ValidationError[] = [];

  if (whitespaceRegex.test(value)) {
    errors.push(emailContainsSpacesError);
  }

  const atIndex = value.lastIndexOf("@");

  if (atIndex === -1) {
    errors.push(missingAtSymbolError);
    return errors;
  }

  const localPart = value.slice(0, atIndex);
  const domainPart = value.slice(atIndex + 1);

  if (!localPart) {
    errors.push(missingLocalPartError);
  }

  if (!domainPart) {
    errors.push(missingDomainError);
  }

 
  if (errors.length === 0 && !emailFormatRegex.test(value)) {
    errors.push(invalidEmailFormatError);
  }

  return errors;
};

(isEmail as any).ruleName = "isEmail";
