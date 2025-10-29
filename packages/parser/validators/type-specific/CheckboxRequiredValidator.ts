import type { ValidationResult } from "../../parser.type";
import type { Validator } from "../base/Validator.interface";

export class CheckboxRequiredValidator implements Validator {
  validate(value: unknown): ValidationResult {
    if (!Array.isArray(value) || value.length === 0) {
      return { isValid: false, error: "최소 1개 이상 선택해주세요" };
    }
    return { isValid: true };
  }
}
