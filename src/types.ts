export interface ValidationError {
  rule: string;
  message: string;
  code: string;
}
export type ValidationValue = unknown;

export interface ValidationResult {
  valid: boolean;
  originalValue: ValidationValue;
  value: ValidationValue;
  errors: ValidationError[];
}

export type ValidationRule = ((value: ValidationValue) => ValidationError[]) & {
  ruleName?: string;
};

export interface ValidationOptions {
  coerce?: boolean;
}
