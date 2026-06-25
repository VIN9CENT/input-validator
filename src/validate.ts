import type {
  ValidationOptions,
  ValidationResult,
  ValidationRule,
  ValidationValue,
} from "./types.js";

const coerceValue = (value: ValidationValue): ValidationValue => {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim().toLowerCase();
};

export const validate = (
  value: ValidationValue,
  rules: ValidationRule[],
  options: ValidationOptions = {},
): ValidationResult => {
  const finalValue = options.coerce ? coerceValue(value) : value;
  const errors = rules.flatMap((rule) => rule(finalValue));

  return {
    valid: errors.length === 0,
    originalValue: value,
    value: finalValue,
    errors,
  };
};
