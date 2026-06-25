import { describe, expect, it } from "vitest";
import { isEmail } from "../rules/isEmail.js";

describe("isEmail", () => {
  it("fails when value is not a string", () => {
    const errors = isEmail(123);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_TYPE");
  });

  it("passes for a normal email address", () => {
    const errors = isEmail("user@example.com");

    expect(errors).toEqual([]);
  });

  it("fails when email does not include an @ symbol", () => {
    const errors = isEmail("userexample.com");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("EMAIL_MISSING_AT_SYMBOL");
  });

  it("fails when email has no local part", () => {
    const errors = isEmail("@example.com");

    expect(errors.some((error) => error.code === "EMAIL_MISSING_LOCAL_PART")).toBe(
      true
    );
  });

  it("fails when email has no domain", () => {
    const errors = isEmail("user@");

    expect(errors.some((error) => error.code === "EMAIL_MISSING_DOMAIN")).toBe(
      true
    );
  });

  it("fails when email contains spaces", () => {
    const errors = isEmail("user name@example.com");

    expect(errors.some((error) => error.code === "EMAIL_CONTAINS_SPACES")).toBe(
      true
    );
  });

  it("fails when email has more than one @ symbol", () => {
    const errors = isEmail("user@@example.com");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_EMAIL_FORMAT");
  });

  it("fails when email has no top-level domain", () => {
    const errors = isEmail("user@example");

    expect(errors.some((error) => error.code === "INVALID_EMAIL_FORMAT")).toBe(
      true
    );
  });
});