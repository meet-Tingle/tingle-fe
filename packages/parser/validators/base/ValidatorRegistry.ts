import type { ValidatorConstructor } from "./Validator.interface";

export class ValidatorRegistry {
  private validators = new Map<string, ValidatorConstructor>();

  register(key: string, validator: ValidatorConstructor): void {
    this.validators.set(key, validator);
  }

  get(key: string): ValidatorConstructor | undefined {
    return this.validators.get(key);
  }

  has(key: string): boolean {
    return this.validators.has(key);
  }

  static builder(): ValidatorRegistryBuilder {
    return new ValidatorRegistryBuilder();
  }
}

export class ValidatorRegistryBuilder {
  private registry = new ValidatorRegistry();

  /**
   * 모든 타입에 공통으로 적용되는 validator 등록
   */
  common(ruleName: string, validator: ValidatorConstructor): this {
    this.registry.register(ruleName, validator);
    return this;
  }

  /**
   * 특정 타입에만 적용되는 validator 등록
   */
  forType(
    fieldType: string,
    ruleName: string,
    validator: ValidatorConstructor,
  ): this {
    this.registry.register(`${fieldType}.${ruleName}`, validator);
    return this;
  }

  /**
   * 여러 타입에 동일한 validator 적용
   */
  forTypes(
    fieldTypes: string[],
    ruleName: string,
    validator: ValidatorConstructor,
  ): this {
    for (const type of fieldTypes) {
      this.registry.register(`${type}.${ruleName}`, validator);
    }
    return this;
  }

  build(): ValidatorRegistry {
    return this.registry;
  }
}
