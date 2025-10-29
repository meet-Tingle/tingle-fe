import { v4 as uuidv4 } from "uuid";
import type { Metadata, ValidationFunction } from "./parser.type";
import {
  defaultValidatorRegistry,
  type Validator,
  ValidatorFactory,
} from "./validators";
import { CustomValidator } from "./validators/common/CustomValidator";

type ParsedField = {
  id: string;
  validate: ValidationFunction;
};

interface ParserInterface {
  parse(metadata: Metadata[]): ParsedField[];
  registerCustomValidation(
    name: string,
    validationFn: ValidationFunction,
  ): void;
}

class Parser implements ParserInterface {
  private validatorFactory: ValidatorFactory;
  private customValidations = new Map<string, ValidationFunction>();

  constructor(validatorFactory?: ValidatorFactory) {
    this.validatorFactory =
      validatorFactory ?? new ValidatorFactory(defaultValidatorRegistry);
  }

  public registerCustomValidation(
    name: string,
    validationFn: ValidationFunction,
  ): void {
    this.customValidations.set(name, validationFn);
  }

  public parse(metadata: Metadata[]) {
    return metadata.map((data) => this.parseField(data));
  }

  private parseField(field: Metadata): ParsedField {
    const id = this.generateId();
    const validate = this.createValidationFunction(field);
    return {
      id,
      validate,
    };
  }

  private generateId(): string {
    return uuidv4();
  }

  private createValidationFunction(field: Metadata): ValidationFunction {
    const validators = this.getValidatorsWithCustomValidation(field);

    return (value) => {
      const errors: string[] = [];

      // 모든 validator 검증하여 에러 수집
      for (const validator of validators) {
        const result = validator.validate(value);
        if (!result.isValid && result.error) {
          errors.push(result.error);
        }
      }

      return errors.length > 0
        ? { isValid: false, error: errors[0], errors }
        : { isValid: true };
    };
  }

  private getValidatorsWithCustomValidation(field: Metadata): Validator[] {
    const validators = this.validatorFactory.create(field);

    if (field.validation?.custom) {
      validators.push(
        new CustomValidator(field.validation.custom, this.customValidations),
      );
    }

    return validators;
  }
}

export function createParser(validatorFactory?: ValidatorFactory): Parser {
  return new Parser(validatorFactory);
}
