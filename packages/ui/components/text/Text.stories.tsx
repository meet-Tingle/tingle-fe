import type { Meta, StoryObj } from "@storybook/react";
import { Text, type TextProps } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg", "xl"] },
    weight: {
      control: { type: "select" },
      options: ["light", "regular", "medium", "semibold", "bold"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "success"],
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
    },
    decoration: {
      control: { type: "select" },
      options: ["none", "underline", "line-through"],
    },
    as: {
      control: { type: "select" },
      options: [
        "p",
        "span",
        "div",
        "label",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<TextProps>;

const containerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  padding: "16px",
  background: "#f9f9f9",
  borderRadius: "8px",
};

const cardStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #e0e0e0",
  borderRadius: "6px",
  background: "#fff",
  textAlign: "center",
};

export const Default: Story = {
  args: {
    children: "Hello, Storybook!",
    size: "md",
    weight: "regular",
    color: "primary",
    align: "left",
    decoration: "none",
    as: "span",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={containerStyle}>
      {["sm", "md", "lg", "xl"].map((size) => (
        <div key={size} style={cardStyle}>
          <Text {...args} size={size as any}>
            {size} Text
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={containerStyle}>
      {["primary", "secondary", "error", "success"].map((color) => (
        <div key={color} style={cardStyle}>
          <Text {...args} color={color as any}>
            {color}
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: (args) => (
    <div style={containerStyle}>
      {["light", "regular", "medium", "semibold", "bold"].map((weight) => (
        <div key={weight} style={cardStyle}>
          <Text {...args} weight={weight as any}>
            {weight}
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: (args) => (
    <div style={containerStyle}>
      {["left", "center", "right", "justify"].map((align) => (
        <div key={align} style={{ ...cardStyle, textAlign: align as any }}>
          <Text {...args} align={align as any}>
            Aligned {align}
          </Text>
        </div>
      ))}
    </div>
  ),
};
