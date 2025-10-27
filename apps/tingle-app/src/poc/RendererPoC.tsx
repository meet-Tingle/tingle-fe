/**
 * Renderer PoC (LEGACY - DEPRECATED)
 *
 * @deprecated Use DynamicForm instead for better performance.
 *
 * DynamicForm 사용의 장점:
 * - react-hook-form 기반으로 성능 최적화
 * - 필드 하나 변경 시 해당 필드만 리렌더링 (React.memo)
 * - Application 레벨에서 form state 관리
 * - 책임 분리: Application(state) vs Renderer(UI)
 *
 * 마이그레이션:
 * ```tsx
 * // Before
 * <DynamicFormRenderer fields={fields} onSubmit={onSubmit} />
 *
 * // After
 * <DynamicForm fields={fields} onSubmit={onSubmit} />
 * ```
 *
 * 기존 책임:
 * 1. ParsedField를 받아서 UI로 렌더링
 * 2. Form state 관리 (입력값, 에러 상태)
 * 3. Component registry 관리
 * 4. Action 실행 (Application에서 주입받은 handler 호출)
 *
 * 의존성: Parser의 출력(ParsedField)에만 의존
 */

import { useCallback, useMemo, useState, useTransition } from "react";
import type { ParsedField } from "./ParserPoc";

/**
 * Action handler 타입
 */
export type ActionHandler = (data: unknown) => void;

/**
 * Form data 타입
 */
export type FormData = Record<string, unknown>;

/**
 * Field 에러 상태
 */
export interface FieldError {
  hasError: boolean;
  message?: string;
}

/**
 * Form state
 */
export interface FormState {
  values: FormData;
  errors: Record<string, FieldError>;
  touched: Record<string, boolean>;
}

/**
 * Default Components (타입별 기본 구현체)
 */
export interface DefaultComponents {
  text?: React.ComponentType<FieldComponentProps>;
  radio?: React.ComponentType<FieldComponentProps>;
  checkbox?: React.ComponentType<FieldComponentProps>;
}

/**
 * DynamicFormRenderer Props
 */
export interface DynamicFormRendererProps {
  fields: ParsedField[];
  actions?: Record<string, ActionHandler>;
  /**
   * 커스텀 컴포넌트 맵
   * - metadata의 component 필드와 매칭
   * - 같은 Form에서 같은 type의 다른 UI 사용 가능
   */
  components?: Record<string, React.ComponentType<FieldComponentProps>>;
  /**
   * 타입별 기본 컴포넌트
   * - component가 지정되지 않은 필드에 사용
   * - 미지정 시 내장 기본 컴포넌트 사용
   */
  defaultComponents?: DefaultComponents;
  onSubmit?: (data: FormData) => void;
  onChange?: (fieldId: string, value: unknown) => void;
}

/**
 * Field Component Props
 * 모든 필드 컴포넌트가 받는 공통 Props
 */
export interface FieldComponentProps {
  field: ParsedField;
  value: unknown;
  error?: FieldError;
  onChange: (value: unknown) => void;
  onBlur: () => void;
}

/**
 * Form State Hook
 *
 * Form의 상태(값, 에러, touched)를 관리
 */
function useFormState(fields: ParsedField[]) {
  // 초기 값 설정
  const initialValues = useMemo(() => {
    const values: FormData = {};
    for (const field of fields) {
      if (field.type === "text") {
        values[field.id] = "";
      } else if (field.type === "radio") {
        values[field.id] = field.selected || "";
      } else if (field.type === "checkbox") {
        values[field.id] = field.selected || [];
      } else if (field.type === "custom") {
        values[field.id] = null;
      }
    }
    return values;
  }, [fields]);

  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
  });
  const [isPending, startTransition] = useTransition();

  /**
   * 값 변경 핸들러
   */
  const setValue = useCallback(
    (fieldId: string, value: unknown, field: ParsedField) => {
      startTransition(() => {
        setState((prev) => ({
          ...prev,
          values: { ...prev.values, [fieldId]: value },
        }));

        // 이미 touched된 필드면 즉시 validation
        if (state.touched[fieldId]) {
          const validationResult = field.validate(value);
          setState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [fieldId]: {
                hasError: !validationResult.isValid,
                message: validationResult.error,
              },
            },
          }));
        }
      });
    },
    [state.touched],
  );

  /**
   * Blur 핸들러 (필드를 떠날 때)
   */
  const setTouched = useCallback((fieldId: string, field: ParsedField) => {
    startTransition(() => {
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [fieldId]: true },
      }));
    });

    // Validation 수행
    startTransition(() => {
      setState((prev) => {
        const value = prev.values[fieldId];
        const validationResult = field.validate(value);
        return {
          ...prev,
          errors: {
            ...prev.errors,
            [fieldId]: {
              hasError: !validationResult.isValid,
              message: validationResult.error,
            },
          },
        };
      });
    });
  }, []);

  /**
   * 전체 폼 validation
   */
  const validateAll = useCallback((): boolean => {
    const newErrors: Record<string, FieldError> = {};
    let isValid = true;

    for (const field of fields) {
      const value = state.values[field.id];
      const validationResult = field.validate(value);

      if (!validationResult.isValid) {
        isValid = false;
        newErrors[field.id] = {
          hasError: true,
          message: validationResult.error,
        };
      } else {
        newErrors[field.id] = {
          hasError: false,
        };
      }
    }

    startTransition(() => {
      setState((prev) => ({
        ...prev,
        errors: newErrors,
        // 모든 필드를 touched 상태로
        touched: fields.reduce(
          (acc, field) => {
            acc[field.id] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      }));
    });

    return isValid;
  }, [fields, state.values]);

  return {
    isPending,
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    setValue,
    setTouched,
    validateAll,
  };
}

/**
 * TextField Component (기본 구현체)
 */
export function TextField({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FieldComponentProps) {
  const inputId = `input-${field.id}`;

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor={inputId}
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        {field.question}
        {field.required && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        id={inputId}
        type="text"
        value={(value as string) || ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={field.placeholder}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: `1px solid ${error?.hasError ? "red" : "#ccc"}`,
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />
      {error?.hasError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

/**
 * RadioField Component (기본 구현체)
 */
export function RadioField({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FieldComponentProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        {field.question}
        {field.required && <span style={{ color: "red" }}> *</span>}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {field.options?.map((option) => {
          const radioId = `${field.id}-${option}`;
          return (
            <label
              key={option}
              htmlFor={radioId}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                id={radioId}
                type="radio"
                name={field.id}
                value={option}
                checked={value === option}
                onChange={(e) => {
                  onChange(e.target.value);
                  onBlur();
                }}
                style={{ marginRight: "6px" }}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {error?.hasError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

/**
 * CheckboxField Component (기본 구현체)
 */
export function CheckboxField({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FieldComponentProps) {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleCheckboxChange = (option: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = [...(selectedValues as string[]), option];
    } else {
      newValues = (selectedValues as string[]).filter((v) => v !== option);
    }
    onChange(newValues);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        {field.question}
        {field.required && <span style={{ color: "red" }}> *</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {field.options?.map((option) => {
          const checkboxId = `${field.id}-${option}`;
          return (
            <label
              key={option}
              htmlFor={checkboxId}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                id={checkboxId}
                type="checkbox"
                value={option}
                checked={(selectedValues as string[]).includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                onBlur={onBlur}
                style={{ marginRight: "6px" }}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {error?.hasError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

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
 * DynamicFormRenderer Component
 *
 * 메인 렌더러 컴포넌트
 */
export function DynamicFormRenderer({
  fields,
  actions = {},
  components = {},
  defaultComponents = {},
  onSubmit,
  onChange,
}: DynamicFormRendererProps) {
  const { values, errors, touched, setValue, setTouched, validateAll } =
    useFormState(fields);

  /**
   * 필드 변경 핸들러
   */
  const handleFieldChange = useCallback(
    (field: ParsedField, value: unknown) => {
      setValue(field.id, value, field);
      onChange?.(field.id, value);

      // Action 실행
      if (field.action && actions[field.action]) {
        actions[field.action](value);
      }
    },
    [setValue, onChange, actions],
  );

  /**
   * 필드 blur 핸들러
   */
  const handleFieldBlur = useCallback(
    (field: ParsedField) => {
      setTouched(field.id, field);
    },
    [setTouched],
  );

  /**
   * Submit 핸들러
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // 전체 validation
      const isValid = validateAll();

      if (isValid) {
        onSubmit?.(values);
      }
    },
    [validateAll, onSubmit, values],
  );

  /**
   * 필드 렌더링
   *
   * 컴포넌트 우선순위:
   * 1. field.component가 있으면 components에서 찾기
   * 2. 없으면 defaultComponents[field.type] 사용
   * 3. 없으면 BUILT_IN_COMPONENTS[field.type] 사용
   * 4. 모두 없으면 경고 메시지 표시
   */
  const renderField = useCallback(
    (field: ParsedField) => {
      const fieldProps: FieldComponentProps = {
        field,
        value: values[field.id],
        error: touched[field.id] ? errors[field.id] : undefined,
        onChange: (value: unknown) => handleFieldChange(field, value),
        onBlur: () => handleFieldBlur(field),
      };

      // 컴포넌트 이름 결정: field.component 또는 field.type
      const componentName = field.component || field.type;

      // 컴포넌트 찾기
      let Component: React.ComponentType<FieldComponentProps> | undefined;

      // 1. field.component가 지정되어 있으면 components에서 찾기
      if (field.component) {
        Component = components[field.component];
      }

      // 2. 없으면 defaultComponents에서 찾기
      if (!Component && field.type in defaultComponents) {
        Component = defaultComponents[field.type as keyof DefaultComponents];
      }

      // 3. 없으면 내장 기본 컴포넌트 사용
      if (!Component) {
        Component = BUILT_IN_COMPONENTS[field.type];
      }

      // 4. 컴포넌트를 찾지 못한 경우
      if (!Component) {
        return (
          <div
            key={field.id}
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

      return <Component key={field.id} {...fieldProps} />;
    },
    [
      values,
      errors,
      touched,
      handleFieldChange,
      handleFieldBlur,
      components,
      defaultComponents,
    ],
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <div style={{ marginBottom: "24px" }}>
        {fields.map((field) => renderField(field))}
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        제출하기
      </button>
    </form>
  );
}
