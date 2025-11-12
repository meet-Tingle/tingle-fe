import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "남성",
    name: "gender",
    value: "male",
  },
};

export const Small: Story = {
  args: {
    label: "20대",
    name: "age",
    value: "20s",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "기본 서비스",
    name: "service",
    value: "basic",
    size: "lg",
  },
};

export const WithError: Story = {
  args: {
    label: "남성",
    name: "gender-error",
    value: "male",
    error: true,
  },
};

export const WithDisabled: Story = {
  args: {
    label: "엔터프라이즈",
    name: "service-disabled",
    value: "enterprise",
    disabled: true,
  },
};

export const RadioGroup: Story = {
  args: {
    label: "남성",
    name: "gender-group",
    value: "male",
  },
  render: (_args) => {
    const [value, setValue] = useState("male");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Radio
          label="남성"
          name="gender-group"
          value="male"
          checked={value === "male"}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label="여성"
          name="gender-group"
          value="female"
          checked={value === "female"}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Controlled: Story = {
  args: {
    label: "남성",
    name: "gender-controlled",
    value: "male",
  },
  render: (_args) => {
    const [value, setValue] = useState("male");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Radio
            label="남성"
            name="gender-controlled"
            value="male"
            checked={value === "male"}
            onChange={(e) => setValue(e.target.value)}
          />
          <Radio
            label="여성"
            name="gender-controlled"
            value="female"
            checked={value === "female"}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div
          style={{
            padding: "12px",
            background: "#F3F4F6",
            borderRadius: "8px",
          }}
        >
          <strong>선택된 값:</strong> {value}
        </div>
        <button
          type="button"
          onClick={() => setValue("")}
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
