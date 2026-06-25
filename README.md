# Input Validator

Input Validator is a small reusable TypeScript validation engine. It lets you validate one value with one or more rules and returns a structured result that explains what passed, what failed, and why.

## Installation

```bash
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

## Validate With One Rule

```ts
import { validate, isEmail } from "input-validator";

const result = validate("student@example.com", [isEmail]);
```

## Validate With Multiple Rules

```ts
import { validate, isRequired, isEmail } from "input-validator";

const result = validate("student@example.com", [isRequired, isEmail]);
```

## Coercion

When `coerce: true` is enabled, string values are trimmed and converted to lowercase before validation.

```ts
import { validate, isRequired, isEmail } from "input-validator";

const result = validate("  STUDENT@EXAMPLE.COM  ", [isRequired, isEmail], {
  coerce: true,
});
```

The result keeps both values:

```json
{
  "valid": true,
  "originalValue": "  STUDENT@EXAMPLE.COM  ",
  "value": "student@example.com",
  "errors": []
}
```

## Available Rules

`isRequired` checks that a value is not `null`, `undefined`, an empty string, a whitespace-only string, or an empty array.

`isEmail` checks that a string is a valid email address with one `@`, a local part, a domain, and no spaces.

`isPhoneNumber` checks E.164 international phone numbers. A valid number starts with `+`, has a non-zero country code, contains only digits after the plus sign, and has 8 to 15 digits.

`isURL` checks URLs that include `http://` or `https://`. Values such as `example.com` fail because a protocol is required.

`isISODate` supports ISO 8601 date-only strings in `YYYY-MM-DD` format. Datetimes such as `2026-06-19T10:30:00Z` are not supported by this rule.

`isUUID` checks standard UUID strings in `8-4-4-4-12` hexadecimal format.

`isStrongPassword` checks that a password has at least 8 characters, at least 1 uppercase letter, at least 1 digit, and at least 1 special character. It returns all failed password requirements together.

## More Examples

```ts
import { validate, isPhoneNumber } from "input-validator";

const result = validate("+254712345678", [isPhoneNumber]);
```

```ts
import { validate, isRequired, isStrongPassword } from "input-validator";

const result = validate("Password1!", [isRequired, isStrongPassword]);
```

```ts
import { validate, isUUID } from "input-validator";

const result = validate("550e8400-e29b-41d4-a716-446655440000", [isUUID]);
```
