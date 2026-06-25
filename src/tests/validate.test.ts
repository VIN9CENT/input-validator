import { describe, expect, it } from "vitest";
import { isEmail } from "../rules/isEmail.js";
import { isRequired } from "../rules/isRequired.js";
import { validate } from "../validate.js";

describe("validate", () => {
  it("returns a valid structured result when one rule passes", () => {
    const result = validate("hello", [isRequired]);

    expect(result).toEqual({
      valid: true,
      originalValue: "hello",
      value: "hello",
      errors: [],
    });
  });

  it("returns errors when one rule fails", () => {
    const result = validate("", [isRequired]);

    expect(result.valid).toBe(false);
    expect(result.originalValue).toBe("");
    expect(result.value).toBe("");
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.code).toBe("REQUIRED");
  });

  it("returns multiple failed rules together", () => {
    const result = validate("", [isRequired, isEmail]);

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain("REQUIRED");
    expect(result.errors.map((error) => error.code)).toContain(
      "EMAIL_MISSING_AT_SYMBOL",
    );
  });

  it("does not depend on rule order", () => {
    const firstResult = validate("", [isRequired, isEmail]);
    const secondResult = validate("", [isEmail, isRequired]);

    expect(firstResult.errors.map((error) => error.code).sort()).toEqual(
      secondResult.errors.map((error) => error.code).sort(),
    );
  });

  it("coerces string values before validation when enabled", () => {
    const result = validate("  STUDENT@EXAMPLE.COM  ", [isRequired, isEmail], {
      coerce: true,
    });

    expect(result).toEqual({
      valid: true,
      originalValue: "  STUDENT@EXAMPLE.COM  ",
      value: "student@example.com",
      errors: [],
    });
  });
});
