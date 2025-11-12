import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["full", "fit", "auto"],
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요",
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "내용을 입력하세요",
    defaultValue: "안녕하세요!\n여러 줄의 텍스트를\n입력할 수 있습니다.",
    rows: 4,
  },
};

export const Small: Story = {
  args: {
    placeholder: "짧은 메모",
    rows: 2,
  },
};

export const Large: Story = {
  args: {
    placeholder: "긴 내용을 작성하세요",
    rows: 8,
  },
};

export const ResizeNone: Story = {
  args: {
    placeholder: "크기 조절 불가",
    resize: "none",
    rows: 4,
  },
};

export const ResizeBoth: Story = {
  args: {
    placeholder: "가로/세로 모두 조절 가능",
    resize: "both",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "에러 상태",
    error: true,
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성 상태",
    disabled: true,
    rows: 4,
  },
};

export const Controlled: Story = {
  args: {
    placeholder: "관심사를 자유롭게 적어주세요 (2자 이상)",
    rows: 4,
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const charCount = value.length;
    const minChars = 2;
    const maxChars = 200;
    const hasError = value.length > 0 && value.length < minChars;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "400px",
        }}
      >
        <Textarea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={hasError}
          maxLength={maxChars}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: hasError ? "#EF4444" : "#6B7280",
          }}
        >
          <span>{hasError && `최소 ${minChars}자 이상 입력해주세요`}</span>
          <span>
            {charCount} / {maxChars}
          </span>
        </div>
      </div>
    );
  },
};
