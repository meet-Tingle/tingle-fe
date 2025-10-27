/**
 * FieldRenderer Component
 *
 * 개별 필드를 렌더링하는 컴포넌트
 * React.memo로 최적화되어 자신의 값이 변경될 때만 리렌더링
 */

import { memo } from "react";
import { type Control, Controller } from "react-hook-form";
import { CheckboxField } from "../fields/CheckboxField";
import { RadioField } from "../fields/RadioField";
import { TextField } from "../fields/TextField";
import type { ParsedField } from "../ParserPoc";
import type {
  ActionHandler,
  DefaultComponents,
  FieldComponentProps,
  FieldError,
  FormData,
} from "../RendererPoC";

/**
 * 내장 기본 컴포넌트 맵
 */
const BUILT_IN_COMPONENTS: Record<
  string,
  React.ComponentType<FieldComponentProps>
> = {
  text: TextField,
  radio: RadioField,
  checkbox: CheckboxField,
};

/**
 * FieldRenderer Props
 */
export interface FieldRendererProps {
  field: ParsedField;
  control: Control<FormData>;
  components?: Record<string, React.ComponentType<FieldComponentProps>>;
  defaultComponents?: DefaultComponents;
  actions?: Record<string, ActionHandler>;
}

/**
 * 컴포넌트 찾기 함수
 *
 * 우선순위:
 * 1. field.component → components
 * 2. field.type → defaultComponents
 * 3. field.type → BUILT_IN_COMPONENTS
 */
function findComponent(
  field: ParsedField,
  components?: Record<string, React.ComponentType<FieldComponentProps>>,
  defaultComponents?: DefaultComponents,
): React.ComponentType<FieldComponentProps> | null {
  // 1. field.component가 지정되어 있으면 components에서 찾기
  if (field.component && components?.[field.component]) {
    return components[field.component];
  }

  // 2. defaultComponents에서 찾기
  if (
    field.type in (defaultComponents || {}) &&
    defaultComponents?.[field.type as keyof DefaultComponents]
  ) {
    return defaultComponents[field.type as keyof DefaultComponents];
  }

  // 3. 내장 기본 컴포넌트 사용
  if (BUILT_IN_COMPONENTS[field.type]) {
    return BUILT_IN_COMPONENTS[field.type];
  }

  return null;
}

/**
 * FieldRenderer Component (React.memo로 최적화)
 *
 * 자신의 필드 값이 변경될 때만 리렌더링됨
 */
export const FieldRenderer = memo(function FieldRenderer({
  field,
  control,
  components,
  defaultComponents,
  actions,
}: FieldRendererProps) {
  const Component = findComponent(field, components, defaultComponents);
  const componentName = field.component || field.type;

  // 컴포넌트를 찾지 못한 경우
  if (!Component) {
    return (
      <div
        style={{
          marginBottom: "20px",
          padding: "12px",
          background: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "4px",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#856404",
          }}
        >
          ⚠️ {field.question}
        </p>
        <p style={{ color: "#856404", fontSize: "14px" }}>
          컴포넌트 "{componentName}"를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <Controller
      name={field.id}
      control={control}
      rules={{
        validate: (value) => {
          const result = field.validate(value);
          return result.isValid || result.error || true;
        },
      }}
      render={({ field: fieldProps, fieldState }) => {
        // react-hook-form의 error를 FieldError 형식으로 변환
        const error: FieldError | undefined = fieldState.error
          ? {
              hasError: true,
              message: fieldState.error.message,
            }
          : undefined;

        return (
          <Component
            field={field}
            value={fieldProps.value}
            error={error}
            onChange={(value) => {
              fieldProps.onChange(value);

              // Action 실행
              if (field.action && actions?.[field.action]) {
                actions[field.action](value);
              }
            }}
            onBlur={fieldProps.onBlur}
          />
        );
      }}
    />
  );
});
