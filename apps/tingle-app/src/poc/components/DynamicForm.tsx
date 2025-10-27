/**
 * DynamicForm Component
 *
 * react-hook-form을 사용한 최적화된 동적 폼
 * Application 레벨에서 form state 관리
 */

import { useEffect } from "react";
import { useFormParser } from "../hooks/useFormParser";
import type { ParsedField } from "../ParserPoc";
import type {
  ActionHandler,
  DefaultComponents,
  FieldComponentProps,
  FormData,
} from "../RendererPoC";
import { FieldRenderer } from "./FieldRenderer";

/**
 * DynamicForm Props
 */
export interface DynamicFormProps {
  fields: ParsedField[];
  components?: Record<string, React.ComponentType<FieldComponentProps>>;
  defaultComponents?: DefaultComponents;
  actions?: Record<string, ActionHandler>;
  onSubmit?: (data: FormData) => void;
  onChange?: (fieldId: string, value: unknown) => void;
}

/**
 * DynamicForm Component
 *
 * 성능 최적화:
 * - react-hook-form으로 form state 관리
 * - FieldRenderer가 React.memo로 최적화
 * - 개별 필드만 독립적으로 리렌더링
 */
export function DynamicForm({
  fields,
  components = {},
  defaultComponents = {},
  actions = {},
  onSubmit,
  onChange,
}: DynamicFormProps) {
  const { form } = useFormParser(fields);

  // onChange 콜백 - watch를 사용하여 변경 감지
  useEffect(() => {
    if (!onChange) return;

    const subscription = form.watch(
      (data: FormData, { name }: { name?: string }) => {
        if (name && data[name] !== undefined) {
          onChange(name, data[name]);
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // Submit handler
  const handleSubmit = form.handleSubmit((data: FormData) => {
    onSubmit?.(data);
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <div style={{ marginBottom: "24px" }}>
        {fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            control={form.control}
            components={components}
            defaultComponents={defaultComponents}
            actions={actions}
          />
        ))}
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
