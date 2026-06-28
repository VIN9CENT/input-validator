# Input Validator

## What This Library Does

Input Validator is a small reusable TypeScript validation engine. It lets you validate one value with one or more rules and returns a structured result that explains what passed, what failed, and why.

## Installation

```bash
git clone git@github.com:VIN9CENT/input-validator.git
cd input-validator
npm install
```

## Run Tests

```bash
npm test
```

## Public API

```ts
import {
  validate,
  isRequired,
  isEmail,
  isPhoneNumber,
  isURL,
  isISODate,
  isUUID,
  isStrongPassword,
} from "input-validator";
```
> **Note**: Use `"./src/index.js"` if running directly from source code.

## Validation Result

```ts
{
  valid: boolean;
  originalValue: unknown;
  value: unknown;
  errors: {
    rule: string;
    message: string;
    code: string;
  }[];
}
```

## Usage Examples

### Validate With One Rule

```ts
import { validate, isEmail } from "input-validator";

const result = validate("student@example.com", [isEmail]);
```

### Validate With Multiple Rules

```ts
import { validate, isRequired, isEmail } from "input-validator";

const result = validate("student@example.com", [isRequired, isEmail]);
```

## Coercion Support and Decisions

Coercion is disabled by default and must be explicitly enabled with `{ coerce: true }`.

When enabled:
- **Whitespace trimming** is applied to all string values. Leading and trailing spaces are common in copy-paste input and rarely intentional.
- **Email lowercasing** is applied only when `isEmail` is one of the rules. Emails are case-insensitive by convention and storing them in lowercase prevents duplicates.

What the library does not coerce:
- Passwords are never lowercased — passwords are case-sensitive and altering them would break authentication.
- Internal whitespace is never removed — a value like `hello world` is not collapsed to `helloworld`.
- Non-string values are never converted — if a number is passed, it stays a number.

### Example: Email Validation (Trimmed + Lowercased)

```ts
import { validate, isEmail } from "input-validator";

const result = validate("  USER@Example.com  ", [isEmail], {
  coerce: true,
});
```

### Example: Password Validation (Trimmed only)

```ts
import { validate, isStrongPassword } from "input-validator";

const result = validate("  SafeP@ss123  ", [isStrongPassword], {
  coerce: true,
});
```

## Available Rules

* **`isRequired`**: Checks that a value is not `null`, `undefined`, an empty string, a whitespace-only string, or an empty array.
* **`isEmail`**: Checks that a string is a valid email address with exactly one `@`, a local part, a domain, and no spaces.
* **`isPhoneNumber`**: Checks E.164 international phone numbers. A valid number starts with `+`, has a non-zero country code, contains only digits after the plus sign, and has **7 to 15 digits**.
* **`isURL`**: Checks URLs that include `http://` or `https://`. Values such as `example.com` fail because an explicit protocol is required.
* **`isISODate`**: Supports ISO 8601 date-only strings in `YYYY-MM-DD` format. Datetimes such as `2026-06-19T10:30:00Z` are not supported by this rule.
* **`isUUID`**: Checks standard UUID strings in `8-4-4-4-12` hexadecimal format.
* **`isStrongPassword`**: Checks that a password has at least 8 characters, at least 1 uppercase letter, at least 1 digit, and at least 1 special character. It returns all failed password requirements together in the errors array.

## More Edge Case Examples

```ts
import { validate, isPhoneNumber } from "input-validator";


const result = validate("+1234567", [isPhoneNumber]);
```

```ts
import { validate, isRequired, isStrongPassword } from "input-validator";

const result = validate("Password1!", [isRequired, isStrongPassword]);
```

```ts
import { validate, isUUID } from "input-validator";

const result = validate("550e8400-e29b-41d4-a716-446655440000", [isUUID]);
```
## Known Limitations

- `isISODate` supports date-only strings in `YYYY-MM-DD` format. Datetime strings such as `2026-06-19T10:30:00Z` are not supported.
- Coercion only trims whitespace and lowercases emails. No other transformations are applied.
- Phone number validation follows E.164 format only. Local or national formats are not supported.
- The library does not sanitize values for security purposes — it only validates format and structure.
