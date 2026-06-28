import type {
  ValidationError,
  ValidationRule,
  ValidationValue,
} from "../types.js";

const validProtocolRegex = /^https?:\/\//;
const whitespaceRegex = /\s/;

const invalidTypeError: ValidationError = {
  rule: "isURL",
  message: "Value must be a string.",
  code: "INVALID_TYPE",
};

const missingProtocolError: ValidationError = {
  rule: "isURL",
  message: "URL must include http:// or https://.",
  code: "URL_MISSING_PROTOCOL",
};

const invalidProtocolError: ValidationError = {
  rule: "isURL",
  message: "URL protocol must be http:// or https://.",
  code: "URL_INVALID_PROTOCOL",
};

const urlContainsSpacesError: ValidationError = {
  rule: "isURL",
  message: "URL must not contain spaces.",
  code: "URL_CONTAINS_SPACES",
};

const invalidURLFormatError: ValidationError = {
  rule: "isURL",
  message: "Value must be a valid URL.",
  code: "INVALID_URL_FORMAT",
};

export const isURL: ValidationRule = (
  value: ValidationValue,
): ValidationError[] => {
  if (typeof value !== "string") {
    return [invalidTypeError];
  }

  const errors: ValidationError[] = [];

  if (whitespaceRegex.test(value)) {
    errors.push(urlContainsSpacesError);
  }

  if (!value.includes("://")) {
    errors.push(missingProtocolError);
    return errors;
  }

  if (!validProtocolRegex.test(value)) {
    errors.push(invalidProtocolError);
    return errors;
  }

 
  if (errors.length === 0) {
    try {
      const url = new URL(value);
      if (!url.hostname) {
        errors.push(invalidURLFormatError);
      }
    } catch {
      errors.push(invalidURLFormatError);
    }
  }

  return errors;
};
