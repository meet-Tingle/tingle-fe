import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, type SpinnerProps } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Suspense/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["circle", "dots"],
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerProps>;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  background: "#f9f9f9",
  borderRadius: "8px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  minWidth: "100px",
  fontWeight: 600,
  fontSize: "14px",
  color: "#374151",
};

// Default
export const Default: Story = {
  args: {
    size: "medium",
    variant: "circle",
  },
};

// Sizes - Circle
export const CircleSizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        Circle Spinner Sizes
      </h3>
      <div style={rowStyle}>
        <span style={labelStyle}>Small:</span>
        <Spinner size="small" variant="circle" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Medium:</span>
        <Spinner size="medium" variant="circle" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Large:</span>
        <Spinner size="large" variant="circle" />
      </div>
    </div>
  ),
};

// Sizes - Dots
export const DotsSizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        Dots Spinner
      </h3>
      <div style={rowStyle}>
        <span style={labelStyle}>Dots:</span>
        <Spinner variant="dots" />
      </div>
    </div>
  ),
};

// In Context
export const InContext: Story = {
  render: () => (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        Usage Examples
      </h3>

      <div
        style={{
          padding: "40px",
          background: "white",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Spinner size="large" />
        <p style={{ margin: 0, color: "#6B7280", fontSize: "14px" }}>
          데이터를 불러오는 중...
        </p>
      </div>

      <div
        style={{
          padding: "40px",
          background: "white",
          borderRadius: "8px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Spinner size="small" />
        <span style={{ fontSize: "14px", color: "#374151" }}>
          처리 중입니다...
        </span>
      </div>

      <div
        style={{
          padding: "40px",
          background: "white",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Spinner variant="dots" />
        <p style={{ margin: 0, color: "#6B7280", fontSize: "14px" }}>
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        All Spinner Variants
      </h3>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
          Circle Spinner
        </h4>
        <div style={rowStyle}>
          <Spinner size="small" variant="circle" />
          <Spinner size="medium" variant="circle" />
          <Spinner size="large" variant="circle" />
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>Dots Spinner</h4>
        <div style={rowStyle}>
          <Spinner variant="dots" />
        </div>
      </div>
    </div>
  ),
};
