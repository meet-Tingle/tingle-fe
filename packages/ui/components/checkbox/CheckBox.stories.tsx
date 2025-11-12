import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckBox } from "./CheckBox";

const meta = {
  title: "Components/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["pill", "rounded", "square"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "음악",
    name: "interest",
    value: "music",
  },
};

export const Small: Story = {
  args: {
    label: "운동",
    name: "interest",
    value: "sports",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "여행",
    name: "interest",
    value: "travel",
    size: "lg",
  },
};

export const Rounded: Story = {
  args: {
    label: "게임",
    name: "interest",
    value: "game",
    variant: "rounded",
  },
};

export const Square: Story = {
  args: {
    label: "맛집 탐방",
    name: "interest",
    value: "food",
    variant: "square",
  },
};

export const WithError: Story = {
  args: {
    label: "스터디",
    name: "interest",
    value: "study",
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "음악",
    name: "interest",
    value: "music",
    disabled: true,
  },
};

export const CheckBoxGroup: Story = {
  args: {
    label: "음악",
    name: "interests",
    value: "music",
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(["music"]);

    const handleChange = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const options = [
      { value: "music", label: "음악" },
      { value: "sports", label: "운동" },
      { value: "study", label: "스터디" },
      { value: "travel", label: "여행" },
      { value: "game", label: "게임" },
      { value: "food", label: "맛집 탐방" },
    ];

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {options.map((option) => (
          <CheckBox
            key={option.value}
            label={option.label}
            name="interests"
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
        ))}
      </div>
    );
  },
};

export const Controlled: Story = {
  args: {
    label: "음악",
    name: "interest",
    value: "music",
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const options = [
      { value: "music", label: "음악" },
      { value: "sports", label: "운동" },
      { value: "travel", label: "여행" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {options.map((option) => (
            <CheckBox
              key={option.value}
              label={option.label}
              name="interests"
              value={option.value}
              checked={selected.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
          ))}
        </div>
        <div
          style={{
            padding: "12px",
            background: "#F3F4F6",
            borderRadius: "8px",
          }}
        >
          <strong>선택된 값:</strong> {selected.join(", ") || "없음"}
        </div>
        <button
          type="button"
          onClick={() => setSelected([])}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            background: "white",
            cursor: "pointer",
          }}
        >
          초기화
        </button>
      </div>
    );
  },
};
