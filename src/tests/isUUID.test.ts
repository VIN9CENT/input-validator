import { describe, expect, it } from "vitest";
import { isUUID } from "../rules/isUUID.js";

describe("isUUID", () => {
  it("fails when value is not a string", () => {
    const errors = isUUID(123);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_TYPE");
  });

  it("passes for a valid lowercase UUID", () => {
    const errors = isUUID("550e8400-e29b-41d4-a716-446655440000");

    expect(errors).toEqual([]);
  });

  it("passes for a valid uppercase UUID", () => {
    const errors = isUUID("550E8400-E29B-41D4-A716-446655440000");

    expect(errors).toEqual([]);
  });

  it("fails when UUID is missing characters", () => {
    const errors = isUUID("550e8400-e29b-41d4-a716-44665544000");

    expect(errors.some((error) => error.code === "UUID_INVALID_LENGTH")).toBe(
      true,
    );
  });

  it("fails when UUID contains invalid characters", () => {
    const errors = isUUID("550e8400-e29b-41d4-a716-44665544000z");

    expect(
      errors.some((error) => error.code === "UUID_INVALID_CHARACTERS"),
    ).toBe(true);
  });

  it("fails when UUID has incorrect hyphen positions", () => {
    const errors = isUUID("550e8400e-29b-41d4-a716-446655440000");

    expect(
      errors.some((error) => error.code === "UUID_INVALID_HYPHEN_POSITION"),
    ).toBe(true);
  });

  it("fails for a random string", () => {
    const errors = isUUID("not-a-uuid");

    expect(errors.length).toBeGreaterThan(0);
  });

  it("fails when UUID has extra hyphens", () => {
    const errors = isUUID("550e8400-e29b-41d4-a716-44665544-000");

    expect(
      errors.some((error) => error.code === "UUID_INVALID_HYPHEN_POSITION"),
    ).toBe(true);
  });
});