import { describe, expect, it } from "vitest";
import { isStrongPassword } from "../rules/isStrongPassword.js";

describe("isStrongPassword", () => {
  it("fails when value is not a string", () => {
    const errors = isStrongPassword(123);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_TYPE");
  });

  it("fails when password is shorter than 8 characters", () => {
    const errors = isStrongPassword("Ab1!");

    expect(errors.some((error) => error.code === "PASSWORD_TOO_SHORT")).toBe(
      true
    );
  });

  it("fails when password has no uppercase letter", () => {
    const errors = isStrongPassword("password1!");

    expect(
      errors.some((error) => error.code === "PASSWORD_MISSING_UPPERCASE")
    ).toBe(true);
  });

  it("fails when password has no digit", () => {
    const errors = isStrongPassword("Password!");

    expect(errors.some((error) => error.code === "PASSWORD_MISSING_DIGIT")).toBe(
      true
    );
  });

  it("fails when password has no special character", () => {
    const errors = isStrongPassword("Password1");

    expect(
      errors.some(
        (error) => error.code === "PASSWORD_MISSING_SPECIAL_CHARACTER"
      )
    ).toBe(true);
  });

  it("returns multiple errors when password fails multiple requirements", () => {
    const errors = isStrongPassword("abc");

    expect(errors.map((error) => error.code)).toEqual([
      "PASSWORD_TOO_SHORT",
      "PASSWORD_MISSING_UPPERCASE",
      "PASSWORD_MISSING_DIGIT",
      "PASSWORD_MISSING_SPECIAL_CHARACTER",
    ]);
  });

  it("passes when password meets all requirements", () => {
    const errors = isStrongPassword("Password1!");

    expect(errors).toEqual([]);
  });
});