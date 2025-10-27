/**
 * Dynamic Form PoC
 *
 * Export all necessary modules
 */

// Renderer (New - Optimized)
export { DynamicForm } from "./components/DynamicForm";
export { FieldRenderer } from "./components/FieldRenderer";
// Demo
export { DemoApp } from "./DemoApp";
export { CheckboxField } from "./fields/CheckboxField";
export { RadioField } from "./fields/RadioField";
// Fields
export { TextField } from "./fields/TextField";
export { useFormParser } from "./hooks/useFormParser";
export type { MetadataField, ValidationRule } from "./mockMetadata";
// Mock Data
export { mockFormMetadata } from "./mockMetadata";
export type {
  ParsedField,
  ValidationFunction,
  ValidationResult,
} from "./ParserPoc";
// Parser
export { createFormParser, FormParser } from "./ParserPoc";
export type {
  ActionHandler,
  DefaultComponents,
  DynamicFormRendererProps,
  FieldComponentProps,
  FieldError,
  FormData,
  FormState,
} from "./RendererPoC";

// Renderer (Legacy - Deprecated)
/**
 * @deprecated Use DynamicForm instead for better performance
 */
export { DynamicFormRenderer } from "./RendererPoC";
