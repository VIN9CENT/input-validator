import type {
  ValidationError,
  ValidationRule,
  ValidationValue,
} from "../types.js";

const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const invalidUUIDCharacterRegex = /[^0-9a-fA-F-]/;
const uuidHyphenIndexes = [8, 13, 18, 23];

const invalidTypeError: ValidationError = {
  rule: "isUUID",
  message: "Value must be a string.",
  code: "INVALID_TYPE",
};

const uuidInvalidLengthError: ValidationError = {
  rule: "isUUID",
  message: "UUID must contain 36 characters.",
  code: "UUID_INVALID_LENGTH",
};

const uuidInvalidCharactersError: ValidationError = {
  rule: "isUUID",
  message: "UUID must contain only hexadecimal characters and hyphens.",
  code: "UUID_INVALID_CHARACTERS",
};

const uuidInvalidHyphenPositionError: ValidationError = {
  rule: "isUUID",
  message: "UUID hyphens must appear in the correct positions.",
  code: "UUID_INVALID_HYPHEN_POSITION",
};

const invalidUUIDFormatError: ValidationError = {
  rule: "isUUID",
  message: "Value must be a valid UUID.",
  code: "INVALID_UUID_FORMAT",
};

export const isUUID: ValidationRule = (
  value: ValidationValue,
): ValidationError[] => {
  if (typeof value !== "string") {
    return [invalidTypeError];
  }

  const errors: ValidationError[] = [];

  if (value.length !== 36) {
    errors.push(uuidInvalidLengthError);
  }

  if (invalidUUIDCharacterRegex.test(value)) {
    errors.push(uuidInvalidCharactersError);
  }

  const hasCorrectHyphenPositions = uuidHyphenIndexes.every(
    (index) => value[index] === "-",
  );

  const hasOnlyExpectedHyphens = [...value].every(
    (character, index) =>
      character !== "-" || uuidHyphenIndexes.includes(index),
  );

  if (!hasCorrectHyphenPositions || !hasOnlyExpectedHyphens) {
    errors.push(uuidInvalidHyphenPositionError);
  }

  if (errors.length > 0) {
    return errors;
  }

  if (!uuidRegex.test(value)) {
    return [invalidUUIDFormatError];
  }

  return [];
};