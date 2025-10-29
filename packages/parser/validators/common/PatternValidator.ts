import type { ValidationResult } from "../../parser.type";
import type { Validator } from "../base/Validator.interface";

export class PatternValidator implements Validator {
  private pattern: RegExp;

  constructor(config?: unknown) {
    if (!(config instanceof RegExp)) {
      throw new Error("PatternValidator requires a RegExp config");
    }
    this.pattern = config;
  }

  validate(value: unknown): ValidationResult {
    if (typeof value !== "string") {
      return { isValid: true };
    }

    if (!this.pattern.test(value)) {
      return {
        isValid: false,
        error: "올바른 형식이 아닙니다",
      };
    }

    return { isValid: true };
  }
}
