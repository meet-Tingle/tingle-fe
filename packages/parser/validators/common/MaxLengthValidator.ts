import type { ValidationResult } from "../../parser.type";
import type { Validator } from "../base/Validator.interface";

export class MaxLengthValidator implements Validator {
  private maxLength: number;

  constructor(config?: unknown) {
    if (typeof config !== "number") {
      throw new Error("MaxLengthValidator requires a number config");
    }
    this.maxLength = config;
  }

  validate(value: unknown): ValidationResult {
    if (typeof value !== "string") {
      return { isValid: true };
    }

    if (value.length > this.maxLength) {
      return {
        isValid: false,
        error: `최대 ${this.maxLength}자까지 입력 가능합니다`,
      };
    }

    return { isValid: true };
  }
}
