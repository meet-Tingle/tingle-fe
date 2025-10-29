import { createFormParser } from "@tingle/parser";
import { Text } from "@tingle/ui";
import { useMemo, useState } from "react";
import { mockFormMetadata } from "./mock";

export default function Form() {
  // parser와 fields를 useMemo로 고정
  const fields = useMemo(() => {
    const parser = createFormParser();

    parser.registerCustomValidation("minSelection", (value) => {
      if (Array.isArray(value) && value.length < 2) {
        return { isValid: false, error: "최소 2개 이상 선택해주세요" };
      }
      return { isValid: true };
    });

    return parser.parse(mockFormMetadata);
  }, []);

  const [fieldValues, setFieldValues] = useState<
    Record<number, string | string[]>
  >({
    0: "",
    1: "남성",
    2: "베이직",
    3: [],
    4: "",
  });

  const handleTextChange = (index: number, value: string) => {
    setFieldValues((prev) => ({ ...prev, [index]: value }));
  };

  const handleRadioChange = (index: number, value: string) => {
    setFieldValues((prev) => ({ ...prev, [index]: value }));
  };

  const handleCheckboxChange = (index: number, option: string) => {
    setFieldValues((prev) => {
      const current = prev[index] || [];
      const currentArray = Array.isArray(current) ? current : [];
      const newValue = currentArray.includes(option)
        ? currentArray.filter((item: string) => item !== option)
        : [...currentArray, option];
      return { ...prev, [index]: newValue };
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Text size="2xl" weight="bold" color="gray_600">
        실시간 Validation System
      </Text>

      <div style={{ marginTop: "30px" }}>
        {mockFormMetadata.map((metadata, index) => {
          const field = fields[index];
          const value = fieldValues[index];
          const validationResult = field.validate(value);

          return (
            <div
              key={field.id}
              style={{
                marginTop: "25px",
                padding: "20px",
                backgroundColor: "#fff",
                border: `2px solid ${validationResult.isValid ? "#4caf50" : "#f44336"}`,
                borderRadius: "8px",
              }}
            >
              <Text size="md" weight="bold" color="gray_600">
                {metadata.question}
              </Text>

              {/* Text 입력 */}
              {metadata.type === "text" && (
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  placeholder={metadata.placeholder}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              )}

              {/* Radio 선택 */}
              {metadata.type === "radio" && (
                <div style={{ marginTop: "10px" }}>
                  {metadata.options.map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "block",
                        marginTop: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={`radio-${index}`}
                        value={option}
                        checked={value === option}
                        onChange={(e) =>
                          handleRadioChange(index, e.target.value)
                        }
                        style={{ marginRight: "8px" }}
                      />
                      <Text size="sm" weight="regular" color="gray_600">
                        {option}
                      </Text>
                    </label>
                  ))}
                </div>
              )}

              {/* Checkbox 선택 */}
              {metadata.type === "checkbox" && (
                <div style={{ marginTop: "10px" }}>
                  {metadata.options.map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "block",
                        marginTop: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={(value || []).includes(option)}
                        onChange={() => handleCheckboxChange(index, option)}
                        style={{ marginRight: "8px" }}
                      />
                      <Text size="sm" weight="regular" color="gray_600">
                        {option}
                      </Text>
                    </label>
                  ))}
                </div>
              )}

              {/* Custom 타입 */}
              {metadata.type === "custom" && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "15px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                  }}
                >
                  <Text size="sm" weight="regular" color="gray_600">
                    커스텀 컴포넌트: {metadata.component}
                  </Text>
                </div>
              )}

              {/* Validation 결과 */}
              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  backgroundColor: validationResult.isValid
                    ? "#e8f5e9"
                    : "#ffebee",
                  borderRadius: "4px",
                }}
              >
                <Text
                  size="sm"
                  weight="bold"
                  color={validationResult.isValid ? "gray_600" : "gray_600"}
                >
                  {validationResult.isValid ? "✅ 유효함" : "❌ 유효하지 않음"}
                </Text>
                {!validationResult.isValid && validationResult.errors && (
                  <div style={{ marginTop: "8px" }}>
                    {validationResult.errors.map((error) => (
                      <div key={error} style={{ marginTop: "4px" }}>
                        <Text size="xs" weight="regular" color="gray_600">
                          • {error}
                        </Text>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 현재 값 표시 */}
              <div style={{ marginTop: "10px" }}>
                <Text size="xs" weight="regular" color="gray_600">
                  현재 값: {JSON.stringify(value)}
                </Text>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <Text size="md" weight="bold" color="gray_600">
          📋 구현된 기능:
        </Text>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ Strategy Pattern으로 Validator 분리
            </Text>
          </li>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ Registry Pattern으로 조건 분기 제거
            </Text>
          </li>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ Builder Pattern으로 선언적 등록
            </Text>
          </li>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ 타입별 특수 Validator (Checkbox)
            </Text>
          </li>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ Custom Validation 지원
            </Text>
          </li>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ 모든 에러 목록 반환
            </Text>
          </li>
          <li>
            <Text size="sm" weight="regular" color="gray_600">
              ✅ 실시간 Validation (입력 시 즉시 검증)
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
}
