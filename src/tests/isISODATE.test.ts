import { describe, expect, it } from "vitest";
import { isISODate } from "../rules/isISODate.js";

describe("isISODate", () => {
  it("fails when value is not a string", () => {
    const errors = isISODate(20260619);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_TYPE");
  });

  it("passes for a valid ISO date", () => {
    const errors = isISODate("2026-06-19");

    expect(errors).toEqual([]);
  });

  it("fails when date uses DD-MM-YYYY format", () => {
    const errors = isISODate("19-06-2026");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_ISO_DATE_FORMAT");
  });

  it("fails when month and day are invalid", () => {
    const errors = isISODate("2026-99-99");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_CALENDAR_DATE");
  });

  it("fails when value is not a date", () => {
    const errors = isISODate("not-a-date");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_ISO_DATE_FORMAT");
  });

  it("fails for an invalid calendar date", () => {
    const errors = isISODate("2026-02-30");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_CALENDAR_DATE");
  });

  it("fails for datetime because only date-only format is supported", () => {
    const errors = isISODate("2026-06-19T10:30:00Z");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe("INVALID_ISO_DATE_FORMAT");
  });
});