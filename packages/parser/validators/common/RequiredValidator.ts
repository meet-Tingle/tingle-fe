import type { ValidationResult } from "../../parser.type";
import type { Validator } from "../base/Validator.interface";

export class RequiredValidator implements Validator {
  validate(value: unknown): ValidationResult {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return { isValid: false, error: "필수 입력 항목입니다" };
    }
    return { isValid: true };
  }
}
