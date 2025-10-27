/**
 * TextField Component (기본 구현체)
 */

import type { FieldComponentProps } from "../RendererPoC";

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
