import type { ValidationResult } from "../../parser.type";
import type { Validator } from "../base/Validator.interface";

export class MinLengthValidator implements Validator {
  private minLength: number;

  constructor(config?: unknown) {
    if (typeof config !== "number") {
      throw new Error("MinLengthValidator requires a number config");
    }
    this.minLength = config;
  }

  validate(value: unknown): ValidationResult {
    if (typeof value !== "string") {
      return { isValid: true };
    }

    if (value.length < this.minLength) {
      return {
        isValid: false,
        error: `최소 ${this.minLength}자 이상 입력해주세요`,
      };
    }

    return { isValid: true };
  }
}
