import type {
  ValidationError,
  ValidationRule,
  ValidationValue,
} from "../types.js";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const invalidTypeError: ValidationError = {
  rule: "isISODate",
  message: "Value must be a string.",
  code: "INVALID_TYPE",
};

const invalidISODateFormatError: ValidationError = {
  rule: "isISODate",
  message: "Date must use ISO 8601 date format: YYYY-MM-DD.",
  code: "INVALID_ISO_DATE_FORMAT",
};

const invalidCalendarDateError: ValidationError = {
  rule: "isISODate",
  message: "Date must be a valid calendar date.",
  code: "INVALID_CALENDAR_DATE",
};

export const isISODate: ValidationRule = (
  value: ValidationValue,
): ValidationError[] => {
  if (typeof value !== "string") {
    return [invalidTypeError];
  }

  if (!isoDateRegex.test(value)) {
    return [invalidISODateFormatError];
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));

  const date = new Date(Date.UTC(year, month - 1, day));

  const isValidCalendarDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  if (!isValidCalendarDate) {
    return [invalidCalendarDateError];
  }

  return [];
};