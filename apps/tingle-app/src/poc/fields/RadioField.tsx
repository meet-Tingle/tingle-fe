/**
 * RadioField Component (기본 구현체)
 */

import type { FieldComponentProps } from "../RendererPoC";

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
