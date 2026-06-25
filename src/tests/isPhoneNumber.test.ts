import { describe, expect, it } from "vitest";
import { isPhoneNumber } from "../rules/isPhoneNumber.js";

describe("isPhoneNumber", () => {
  it("fails when value is not a string", () => {
    const errors = isPhoneNumber(254712345678);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_TYPE");
  });

  it("passes for a valid E.164 phone number", () => {
    const errors = isPhoneNumber("+254712345678");

    expect(errors).toEqual([]);
  });

  it("fails when phone number does not start with plus sign", () => {
    const errors = isPhoneNumber("254712345678");

    expect(errors.some((error) => error.code === "PHONE_MISSING_PLUS_SIGN")).toBe(
      true
    );
  });

  it("fails when phone number contains letters", () => {
    const errors = isPhoneNumber("+254ABC345678");

    expect(errors.some((error) => error.code === "PHONE_CONTAINS_LETTERS")).toBe(
      true
    );
  });

  it("fails when phone number contains spaces", () => {
    const errors = isPhoneNumber("+254 712345678");

    expect(errors.some((error) => error.code === "PHONE_CONTAINS_SPACES")).toBe(
      true
    );
  });

  it("fails when phone number is too short", () => {
    const errors = isPhoneNumber("+254");

    expect(errors.some((error) => error.code === "PHONE_TOO_SHORT")).toBe(true);
  });

  it("fails when phone number is too long", () => {
    const errors = isPhoneNumber("+1234567890123456");

    expect(errors.some((error) => error.code === "PHONE_TOO_LONG")).toBe(true);
  });

  it("fails when phone number has invalid E.164 format", () => {
    const errors = isPhoneNumber("+054712345678");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_PHONE_NUMBER_FORMAT");
  });
});