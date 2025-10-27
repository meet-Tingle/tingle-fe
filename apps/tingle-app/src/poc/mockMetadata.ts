/**
 * CMS에서 받을 Metadata 예시 데이터
 * 실제로는 API를 통해 받아올 데이터
 */

export interface MetadataField {
  type: "text" | "radio" | "checkbox" | "custom";
  question: string;
  placeholder?: string;
  validation?: ValidationRule;
  action?: string;
  // Radio/Checkbox 관련
  options?: string[];
  selected?: string | string[];
  required?: boolean;
  // UI Component 지정 (선택적)
  // - 지정하지 않으면 type을 기본 컴포넌트명으로 사용
  // - 지정하면 해당 이름의 컴포넌트 사용 (같은 Form에서 다른 UI 가능)
  component?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: string; // custom validation 키
}

/**
 * 1페이지에 해당하는 mock metadata
 */
export const mockFormMetadata: MetadataField[] = [
  {
    type: "text",
    question: "당신의 이름은 무엇인가요?",
    placeholder: "홍길동",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 10,
    },
    action: "btn_action_1",
    // component 미지정 → 기본 text 컴포넌트 사용
  },
  {
    type: "radio",
    question: "당신의 성별을 골라주세요",
    options: ["남성", "여성"],
    selected: "남성",
    required: true,
    action: "radio_action_1",
    // component 미지정 → 기본 radio 컴포넌트 사용
  },
  {
    type: "radio",
    question: "선호하는 플랜을 선택하세요",
    options: ["베이직", "프리미엄", "엔터프라이즈"],
    selected: "베이직",
    required: true,
    component: "fancy-radio", // 같은 radio지만 다른 UI (카드 스타일)
  },
  {
    type: "checkbox",
    question: "당신의 취미를 골라주세요",
    options: ["운동", "독서", "영화", "개발"],
    selected: ["운동", "독서"],
    required: true,
    validation: {
      custom: "minSelection",
    },
  },
  {
    type: "text",
    question: "이메일 주소를 입력해주세요",
    placeholder: "example@email.com",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    type: "custom",
    component: "custom_component_1",
    question: "커스텀 컴포넌트 예시",
    action: "custom_component_1_action",
  },
];
