import type {
  ValidationError,
  ValidationRule,
  ValidationValue,
} from "../types.js";

const requiredError: ValidationError = {
  rule: "isRequired",
  message: "Value is required.",
  code: "REQUIRED",
};

export const isRequired: ValidationRule = (value: ValidationValue): ValidationError[] => {
  const isMissing =
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0);

  return isMissing ? [requiredError] : [];
};
