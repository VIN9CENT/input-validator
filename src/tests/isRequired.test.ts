import { describe, expect, it } from "vitest";
import { isRequired } from "../rules/isRequired.js";

describe("isRequired", () => {
  it("fails when value is null", () => {
    const errors = isRequired(null);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("REQUIRED");
  });

  it("fails when value is undefined", () => {
    const errors = isRequired(undefined);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("REQUIRED");
  });

  it("fails when value is an empty string", () => {
    const errors = isRequired("");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("REQUIRED");
  });

  it("fails when value is only whitespace", () => {
    const errors = isRequired("   ");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("REQUIRED");
  });

  it("fails when value is an empty array", () => {
    const errors = isRequired([]);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("REQUIRED");
  });

  it("passes when value is a non-empty string", () => {
    const errors = isRequired("hello");

    expect(errors).toEqual([]);
  });

  it("passes when value is 0", () => {
    const errors = isRequired(0);

    expect(errors).toEqual([]);
  });

  it("passes when value is false", () => {
    const errors = isRequired(false);

    expect(errors).toEqual([]);
  });
});