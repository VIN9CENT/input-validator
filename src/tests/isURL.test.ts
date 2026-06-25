import { describe, expect, it } from "vitest";
import { isURL } from "../rules/isURL.js";

describe("isURL", () => {
  it("fails when value is not a string", () => {
    const errors = isURL(123);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_TYPE");
  });

  it("passes for a valid https URL", () => {
    const errors = isURL("https://example.com");

    expect(errors).toEqual([]);
  });

  it("passes for a valid http URL", () => {
    const errors = isURL("http://example.com");

    expect(errors).toEqual([]);
  });

  it("fails when URL has no protocol", () => {
    const errors = isURL("example.com");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("URL_MISSING_PROTOCOL");
  });

  it("fails when URL has an unsupported protocol", () => {
    const errors = isURL("ftp://example.com");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("URL_INVALID_PROTOCOL");
  });

  it("fails when URL contains spaces", () => {
    const errors = isURL("https://example .com");

    expect(errors.some((error) => error.code === "URL_CONTAINS_SPACES")).toBe(
      true
    );
  });

  it("fails when URL is malformed", () => {
    const errors = isURL("https://");

    expect(errors.some((error) => error.code === "INVALID_URL_FORMAT")).toBe(
      true
    );
  });

  it("fails for a random string", () => {
    const errors = isURL("not-a-url");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("URL_MISSING_PROTOCOL");
  });
});