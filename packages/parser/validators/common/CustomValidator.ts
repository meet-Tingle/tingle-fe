import type { ValidationFunction, ValidationResult } from "../../parser.type";
import type { Validator } from "../base/Validator.interface";

export class CustomValidator implements Validator {
  constructor(
    private customName: string,
    private customValidations: Map<string, ValidationFunction>,
    _config?: unknown,
  ) {}

  validate(value: unknown): ValidationResult {
    const customFn = this.customValidations.get(this.customName);

    if (!customFn) {
      console.warn(`Custom validation "${this.customName}" not found`);
      return { isValid: true };
    }

    return customFn(value);
  }
}
