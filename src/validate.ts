import type {
  ValidationOptions,
  ValidationResult,
  ValidationRule,
  ValidationValue,
} from "./types.js";

const coerceValue = (
  value: ValidationValue,
  rules: ValidationRule[],
): ValidationValue => {
  if (typeof value !== "string") {
    return value;
  }

  let coerced = value.trim();

  const hasEmailRule = rules.some((rule) => (rule as any).ruleName === "isEmail");

  if (hasEmailRule) {
    coerced = coerced.toLowerCase();
  }

  return coerced;
};

export const validate = (
  value: ValidationValue,
  rules: ValidationRule[],
  options: ValidationOptions = {},
): ValidationResult => {
  const finalValue = options.coerce ? coerceValue(value, rules) : value;
  const errors = rules.flatMap((rule) => rule(finalValue));

  return {
    valid: errors.length === 0,
    originalValue: value,
    value: finalValue,
    errors,
  };
};
