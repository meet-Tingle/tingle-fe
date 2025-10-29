export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errors?: string[];
}

export type ValidationFunction = (value: unknown) => ValidationResult;

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: string;
}

type BaseField = {
  type: "text" | "radio" | "checkbox" | "custom";
  question: string;
};

type TextField = {
  type: "text";
  placeholder?: string;
  required?: boolean;
  action?: string;
  component?: string;
  validation?: ValidationRule;
};

type RadioField = {
  type: "radio";
  options: string[];
  selected?: string;
  required?: boolean;
  action?: string;
  component?: string;
  validation?: ValidationRule;
};

type CheckboxField = {
  type: "checkbox";
  options: string[];
  selected?: string[];
  required?: boolean;
  action?: string;
  component?: string;
  validation?: ValidationRule;
};

type CustomField = {
  type: "custom";
  component: string;
  required?: boolean;
  action?: string;
  validation?: ValidationRule;
};

export type Metadata = BaseField &
  (TextField | RadioField | CheckboxField | CustomField);
