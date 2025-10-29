import type { Metadata } from "../../parser.type";
import type { Validator } from "./Validator.interface";
import type { ValidatorRegistry } from "./ValidatorRegistry";

export class ValidatorFactory {
  constructor(private registry: ValidatorRegistry) {}

  create(field: Metadata): Validator[] {
    const validators: Validator[] = [];
    const { type, required, validation } = field;

    if (required || validation?.required) {
      const requiredValidator = this.createValidator(type, "required");
      if (requiredValidator) {
        validators.push(requiredValidator);
      }
    }

    if (validation) {
      for (const [ruleName, config] of Object.entries(validation)) {
        if (ruleName === "required") continue;

        const validator = this.createValidator(type, ruleName, config);
        if (validator) {
          validators.push(validator);
        }
      }
    }

    return validators;
  }

  private createValidator(
    fieldType: string,
    ruleName: string,
    config?: unknown,
  ): Validator | null {
    // 타입별 특수 validator 조회
    const typeSpecificKey = `${fieldType}.${ruleName}`;
    if (this.registry.has(typeSpecificKey)) {
      const ValidatorClass = this.registry.get(typeSpecificKey);
      return ValidatorClass ? new ValidatorClass(config) : null;
    }

    // 공통 validator 조회
    const ValidatorClass = this.registry.get(ruleName);
    return ValidatorClass ? new ValidatorClass(config) : null;
  }
}
