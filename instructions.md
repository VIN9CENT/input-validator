# Sprint 1: Input Validation Engine

You have joined a software team building multiple web applications. Each application currently validates user input differently, causing duplicated logic, inconsistent error messages, and bugs.

Your task is to build a small reusable validation engine that other developers can import into their projects.

The library should make it easy to validate values using one or more rules. For example, another developer should be able to check whether a value is required and whether it is a valid email address using one simple validation call.

The library must not simply return `true` or `false`. It must return a structured result that explains whether validation passed, what failed, and why it failed.

---

## Technical Constraints

Students must follow these constraints:

- Do not use an external validation library for the core validation logic.
- Do not hardcode tests to pass specific examples only.
- Do not return only `true` or `false`.
- Do not mix validation logic with console output.
- Do not write all code in one large function.
- Do not ignore invalid input types.
- Do not skip documentation.

---

## Functional Requirements

### REQ-001: Create a Reusable Validation Library

Build a reusable validation library that can be imported and used by another developer. The library should expose validation functions through a clear public API. The implementation should separate validation logic from test code and documentation.

**Acceptance criteria:**
- The validation library can be imported into another file.
- The library exposes a clear validation API.
- Validation rules are reusable.
- Validation logic is not hardcoded into a single script.
- The code is organized in a way another developer can understand.

---

### REQ-002: Implement Required Field Validation

Create an `isRequired` validation rule. The rule should check whether a value has been provided. The rule should fail for empty strings, strings containing only whitespace, `null`, and `undefined`.

**Acceptance criteria:**
- Empty string fails validation.
- Whitespace-only string fails validation.
- `null` fails validation.
- `undefined` fails validation.
- Non-empty values pass validation.

---

### REQ-003: Implement Email Validation

Create an `isEmail` validation rule. The rule should validate whether a value is a correctly formatted email address. The validation should reject clearly invalid email formats.

**Acceptance criteria:**
- A normal email such as `user@example.com` passes.
- An email without `@` fails.
- An email without a domain fails.
- An email without a local part fails.
- An email with spaces fails.
- The error response explains why the value failed.

---

### REQ-004: Implement Phone Number Validation

Create an `isPhoneNumber` validation rule. The rule should validate phone numbers using the E.164 international format. A valid E.164 number starts with `+`, followed by the country code and subscriber number.

**Acceptance criteria:**
- A value such as `+254712345678` passes.
- A number without `+` fails.
- A number containing letters fails.
- A number with spaces fails.
- A number that is too short fails.
- A number that is too long fails.
- The error response explains why the value failed.

---

### REQ-005: Implement URL Validation

Create an `isURL` validation rule. The rule should validate whether a value is a properly formatted URL. The rule should accept URLs with valid protocols such as `http://` and `https://`.

**Acceptance criteria:**
- `https://example.com` passes.
- `http://example.com` passes.
- `example.com` without a protocol fails unless you explicitly document a different decision.
- A random string fails.
- A malformed URL fails.
- The error response explains why the value failed.

---

### REQ-006: Implement ISO 8601 Date Validation

Create an `isISODate` validation rule. The rule should validate dates using the ISO 8601 format. The implementation should reject invalid calendar dates.

**Acceptance criteria:**
- `2026-06-19` passes.
- `2026-06-19T10:30:00Z` passes if datetime support is included.
- `19-06-2026` fails.
- `2026-99-99` fails.
- `not-a-date` fails.
- The README documents exactly which ISO 8601 formats are supported.

---

### REQ-007: Implement UUID Validation

Create an `isUUID` validation rule. The rule should validate whether a value is a valid UUID.

**Acceptance criteria:**
- A valid UUID passes.
- A UUID missing characters fails.
- A UUID with invalid characters fails.
- A UUID with incorrect hyphen positions fails.
- A random string fails.
- The error response explains why the value failed.

---

### REQ-008: Implement Password Strength Validation

Create an `isStrongPassword` validation rule. The password must meet the following minimum rules:

- At least 8 characters long.
- At least 1 uppercase letter.
- At least 1 digit.
- At least 1 special character.

**Acceptance criteria:**
- A password with fewer than 8 characters fails.
- A password without an uppercase letter fails.
- A password without a digit fails.
- A password without a special character fails.
- A password meeting all rules passes.
- The error response lists all failed password requirements, not just the first failure.

---

### REQ-009: Support Composable Validation Rules

The validation engine must allow multiple validation rules to be applied to one value.

**Example:**
```js
validate("student@example.com", [isRequired, isEmail])
```

The validation engine should execute all provided rules and return a structured result.

**Acceptance criteria:**
- A value can be checked against one rule.
- A value can be checked against multiple rules.
- Multiple failed rules are reported together.
- The order of rules does not break the validation engine.
- The API is simple enough for another developer to use without reading the implementation.

---

### REQ-010: Return Structured Validation Results

The validation engine must return a structured object instead of a simple boolean. The result should explain:

- Whether the value is valid.
- Which rules failed.
- Why each rule failed.
- The original value.
- The final value after coercion, if coercion is enabled.

**Example response shape:**
```json
{
  "valid": false,
  "value": "bad-email",
  "errors": [
    {
      "rule": "isEmail",
      "message": "Value must be a valid email address.",
      "code": "INVALID_EMAIL"
    }
  ]
}
```

**Acceptance criteria:**
- Successful validation returns `valid: true`.
- Failed validation returns `valid: false`.
- Failed validation includes an `errors` array.
- Each error includes the rule name.
- Each error includes a human-readable message.
- Each error includes a machine-readable error code.

---

### REQ-011: Include at Least 5 Edge-Case Tests Per Validation Rule

Each validation rule must include at least 5 edge-case tests. The tests should prove that the rule works for realistic and unusual inputs.

**Acceptance criteria:**
- `isRequired` has at least 5 edge-case tests.
- `isEmail` has at least 5 edge-case tests.
- `isPhoneNumber` has at least 5 edge-case tests.
- `isURL` has at least 5 edge-case tests.
- `isISODate` has at least 5 edge-case tests.
- `isUUID` has at least 5 edge-case tests.
- `isStrongPassword` has at least 5 edge-case tests.
- Tests include both passing and failing cases.
- Tests can be run using a documented command.

---

### REQ-012: Provide a README.md File

Create a `README.md` file documenting how to install, import, and use the validation library. The README should be written for another developer, not for the instructor.

**Acceptance criteria:**
- README explains what the library does.
- README shows how to run the tests.
- README shows how to validate one value with one rule.
- README shows how to validate one value with multiple rules.
- README documents all available validation rules.
- README explains the structure of the validation result object.
- README includes at least 3 usage examples.

---

## Extended Requirements

### EXT-001: Add Coercion Support

Add a `coerce` option to the validation engine. When `coerce: true` is passed, the validation engine should attempt to clean the input before validation.

**Example:**
```js
validate("  STUDENT@EXAMPLE.COM  ", [isRequired, isEmail], {
  coerce: true
})
```

**Expected behavior:**
```json
{
  "valid": true,
  "value": "student@example.com",
  "originalValue": "  STUDENT@EXAMPLE.COM  ",
  "errors": []
}
```

**Acceptance criteria:**
- The `validate` function accepts an options object.
- The options object supports `coerce: true`.
- Coercion happens before validation.
- The result object includes the original value.
- The result object includes the coerced value.
- Coercion behavior is documented in the README.

---

### EXT-002: Trim Whitespace During Coercion

When `coerce: true` is enabled, the validation engine should trim leading and trailing whitespace from string values.

**Example:**
```js
validate("  hello@example.com  ", [isEmail], {
  coerce: true
})
```

**Expected validated value:** `"hello@example.com"`

**Acceptance criteria:**
- Leading whitespace is removed.
- Trailing whitespace is removed.
- Internal whitespace is not removed unless specifically documented.
- Trimming behavior is tested.
- Trimming behavior is documented.

---

### EXT-003: Lowercase Email Values During Coercion

When `coerce: true` is enabled and the email validation rule is used, the email should be converted to lowercase before validation.

**Example:**
```js
validate("STUDENT@EXAMPLE.COM", [isEmail], {
  coerce: true
})
```

**Expected validated value:** `"student@example.com"`

**Acceptance criteria:**
- Uppercase email characters are converted to lowercase.
- Lowercase conversion only happens when appropriate.
- The original value is still available in the validation result.
- Lowercase email coercion is tested.
- Lowercase email coercion is documented.

---

### EXT-004: Document Coercion Decisions

The README must explain what the library coerces and why. The documentation should make it clear that coercion is optional and must be explicitly enabled.

**Acceptance criteria:**
- README explains that coercion is disabled by default.
- README explains that whitespace trimming is performed when coercion is enabled.
- README explains that email lowercasing is performed when coercion is enabled.
- README explains why these coercions are safe and useful.
- README explains what the library does not coerce.

---

## README.md Must Include

The README must include the following sections:

```
# Input Validation Engine

## What This Library Does
## Installation
## Running Tests
## Basic Usage
## Available Rules
## Validation Result Format
## Using Multiple Rules
## Using Coercion
## Coercion Decisions
## Examples
## Known Limitations
```

---

## Grading Criteria

| Area | Weight |
|---|---|
| Validation correctness | 25% |
| Structured error design | 20% |
| Composable API design | 15% |
| Edge-case testing | 20% |
| README documentation | 10% |
| Code organization and readability | 10% |

---

## Assessment Questions

During review, students should be able to answer:

1. Why did you return a structured object instead of a boolean?
2. How does your validation engine support multiple rules?
3. What happens when more than one rule fails?
4. What edge cases were hardest to test?
5. Why did you choose your error object shape?
6. What does coercion change before validation?
7. Why is coercion optional?
8. What did you choose not to coerce, and why?
9. How would another developer add a new validation rule?
10. How would your library behave in a real registration form?