import type { ValidationResult } from "../../parser.type";

export interface Validator {
  validate(value: unknown): ValidationResult;
}

export type ValidatorConstructor = new (config?: unknown) => Validator;
