/**
 * Dynamic Form PoC Demo Application
 *
 * Parser와 Renderer를 실제로 사용하는 예시
 * Application 레벨에서 어떻게 구성하는지 보여줍니다.
 */

import { DynamicForm } from "./components/DynamicForm";
import { mockFormMetadata } from "./mockMetadata";
import { createFormParser } from "./ParserPoc";
import type { FieldComponentProps, FormData } from "./RendererPoC";

/**
 * Custom Component 예시 1
 * Application에서 정의하여 Renderer에 주입
 */
function CustomComponent1({ field, value, onChange }: FieldComponentProps) {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "16px",
        background: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "12px" }}>
        {field.question}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={() => onChange("option1")}
          style={{
            padding: "8px 16px",
            backgroundColor: value === "option1" ? "#007bff" : "#e9ecef",
            color: value === "option1" ? "white" : "#495057",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          옵션 1
        </button>
        <button
          type="button"
          onClick={() => onChange("option2")}
          style={{
            padding: "8px 16px",
            backgroundColor: value === "option2" ? "#007bff" : "#e9ecef",
            color: value === "option2" ? "white" : "#495057",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          옵션 2
        </button>
      </div>
    </div>
  );
}

/**
 * Fancy Radio Component 예시
 * 같은 radio 타입이지만 다른 UI (카드 스타일)
 */
function FancyRadio({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FieldComponentProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "block",
          marginBottom: "12px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {field.question}
        {field.required && <span style={{ color: "red" }}> *</span>}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {field.options?.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                onBlur();
              }}
              style={{
                padding: "20px",
                background: isSelected
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "#ffffff",
                color: isSelected ? "white" : "#333",
                border: isSelected ? "2px solid #667eea" : "2px solid #e0e0e0",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: isSelected ? "bold" : "normal",
                fontSize: "14px",
                transition: "all 0.2s ease",
                textAlign: "center",
                boxShadow: isSelected
                  ? "0 4px 12px rgba(102, 126, 234, 0.4)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "#e0e0e0";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error?.hasError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

/**
 * Demo Application Component
 */
export function DemoApp() {
  // 1. Parser 인스턴스 생성
  const parser = createFormParser();

  // 2. Custom validation 등록 (Application 레벨)
  parser.addCustomValidation("minSelection", (value) => {
    if (Array.isArray(value) && value.length < 2) {
      return {
        isValid: false,
        error: "최소 2개 이상 선택해주세요",
      };
    }
    return { isValid: true };
  });

  // 3. Metadata 파싱
  const parsedFields = parser.parse(mockFormMetadata);

  // 4. Action handlers 정의 (Application 레벨 비즈니스 로직)
  const actionHandlers = {
    btn_action_1: (value: unknown) => {
      console.log("버튼 액션 1 실행:", value);
    },
    radio_action_1: (value: unknown) => {
      console.log("라디오 액션 1 실행:", value);
    },
    custom_component_1_action: (value: unknown) => {
      console.log("커스텀 컴포넌트 액션 실행:", value);
    },
  };

  // 5. Components 등록
  const components = {
    "fancy-radio": FancyRadio, // 카드 스타일 radio
    custom_component_1: CustomComponent1, // custom 타입
  };

  // 6. Submit handler
  const handleSubmit = (data: FormData) => {
    console.log("=== Form Submit ===");
    console.log("제출된 데이터:", data);
    alert("폼이 제출되었습니다! 콘솔을 확인하세요.");
  };

  // 7. Change handler
  const handleChange = (fieldId: string, value: unknown) => {
    console.log(`필드 변경: ${fieldId} =`, value);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      {/* <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
        Dynamic Form PoC Demo
      </h1>
      <div
        style={{
          marginBottom: "24px",
          padding: "16px",
          background: "#e7f3ff",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginBottom: "12px" }}>아키텍처</h3>
        <p style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>CMS (Mock Data)</strong> → <strong>Parser</strong> (Validation
          함수 생성) → <strong>Renderer</strong> (UI 렌더링)
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          • Parser: Metadata를 파싱하고 validation 함수 생성
          <br />• Renderer: 파싱된 데이터를 받아 UI 렌더링 및 state 관리
          <br />• Application: 비즈니스 로직 (action, custom validation, custom
          component)
        </p>
      </div> */}

      <DynamicForm
        fields={parsedFields}
        actions={actionHandlers}
        components={components}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <div
        style={{
          marginTop: "32px",
          padding: "16px",
          background: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginBottom: "12px" }}>특징</h3>
        <ul style={{ paddingLeft: "20px", fontSize: "14px" }}>
          <li>✅ CMS metadata 기반 동적 Form 생성</li>
          <li>
            ✅ Parser에서 기본 validation 처리 (required, minLength, maxLength,
            pattern)
          </li>
          <li>✅ Application에서 custom validation 확장 가능</li>
          <li>✅ 유연한 UI Component 시스템</li>
          <li style={{ marginLeft: "20px", fontSize: "13px", color: "#666" }}>
            • 같은 Form에서 같은 타입의 다른 UI 사용 가능 (예: 일반 radio, 카드
            스타일 radio)
          </li>
          <li style={{ marginLeft: "20px", fontSize: "13px", color: "#666" }}>
            • metadata에 component 지정 또는 기본 컴포넌트 사용
          </li>
          <li>✅ Action system으로 비즈니스 로직 분리</li>
          <li>✅ Renderer 내부에서 form state 관리</li>
          <li>✅ 실시간 validation 피드백</li>
          <li>✅ 단방향 의존성 (Application → Renderer → Parser)</li>
        </ul>
      </div>
    </div>
  );
}
