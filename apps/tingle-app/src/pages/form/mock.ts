import type { Metadata } from "@tingle/parser";

export const mockFormMetadata: Metadata[] = [
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
  },
  {
    type: "radio",
    question: "당신의 성별을 골라주세요",
    options: ["남성", "여성"],
    selected: "남성",
    required: true,
    action: "radio_action_1",
  },
  {
    type: "radio",
    question: "선호하는 플랜을 선택하세요",
    options: ["베이직", "프리미엄", "엔터프라이즈"],
    selected: "베이직",
    required: true,
    component: "fancy-radio",
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
