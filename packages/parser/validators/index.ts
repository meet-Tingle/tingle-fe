import { ValidatorRegistry } from "./base/ValidatorRegistry";
import { MaxLengthValidator } from "./common/MaxLengthValidator";
import { MinLengthValidator } from "./common/MinLengthValidator";
import { PatternValidator } from "./common/PatternValidator";
import { RequiredValidator } from "./common/RequiredValidator";
import { CheckboxRequiredValidator } from "./type-specific/CheckboxRequiredValidator";

export const defaultValidatorRegistry = ValidatorRegistry.builder()
  .common("required", RequiredValidator)
  .common("minLength", MinLengthValidator)
  .common("maxLength", MaxLengthValidator)
  .common("pattern", PatternValidator)
  .forType("checkbox", "required", CheckboxRequiredValidator)
  .build();

export type {
  Validator,
  ValidatorConstructor,
} from "./base/Validator.interface";
export { ValidatorFactory } from "./base/ValidatorFactory";
export { ValidatorRegistry } from "./base/ValidatorRegistry";
