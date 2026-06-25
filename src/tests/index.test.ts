import { describe, expect, it } from "vitest";
import { validate, isRequired, isEmail } from "../index.js";

describe("public API", () => {
  it("validates through the main library export", () => {
    const result = validate("student@example.com", [isRequired, isEmail]);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});