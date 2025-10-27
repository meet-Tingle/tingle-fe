/**
 * CheckboxField Component (기본 구현체)
 */

import type { FieldComponentProps } from "../RendererPoC";

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
