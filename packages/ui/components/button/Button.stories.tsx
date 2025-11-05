import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "danger", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "small", "fit"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    underline: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
  background: "#f9f9f9",
  borderRadius: "8px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
};

const labelStyle: React.CSSProperties = {
  minWidth: "80px",
  fontWeight: 600,
  fontSize: "14px",
  color: "#374151",
};

// Simple icon components for examples
const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="heart icon"
  >
    <title>Heart</title>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="arrow icon"
  >
    <title>Arrow</title>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="plus icon"
  >
    <title>Plus</title>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "default",
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Primary</span>
        <Button variant="primary">Primary Button</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Secondary</span>
        <Button variant="secondary">Secondary Button</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Outline</span>
        <Button variant="outline">Outline Button</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Ghost</span>
        <Button variant="ghost">Ghost Button</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Danger</span>
        <Button variant="danger">Danger Button</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Text</span>
        <Button variant="text">Text Button</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Default</span>
        <Button variant="primary" size="default">
          Default Size (100% width)
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Small</span>
        <Button variant="primary" size="small">
          Small Size
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Fit</span>
        <Button variant="primary" size="fit">
          Fit Size
        </Button>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Left Icon</span>
        <Button variant="primary" size="small">
          <Button.LeftIcon>
            <HeartIcon />
          </Button.LeftIcon>
          Like
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Right Icon</span>
        <Button variant="primary" size="small">
          Next
          <Button.RightIcon>
            <ArrowIcon />
          </Button.RightIcon>
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Both Icons</span>
        <Button variant="outline" size="small">
          <Button.LeftIcon>
            <PlusIcon />
          </Button.LeftIcon>
          Add Item
          <Button.RightIcon>
            <ArrowIcon />
          </Button.RightIcon>
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Icon Only</span>
        <Button variant="ghost" size="fit">
          <Button.LeftIcon>
            <HeartIcon />
          </Button.LeftIcon>
        </Button>
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <Button variant="primary" disabled>
          Primary Disabled
        </Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button variant="outline" disabled>
          Outline Disabled
        </Button>
      </div>
      <div style={rowStyle}>
        <Button variant="ghost" disabled>
          Ghost Disabled
        </Button>
        <Button variant="danger" disabled>
          Danger Disabled
        </Button>
        <Button variant="text" disabled>
          Text Disabled
        </Button>
      </div>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>No Underline</span>
        <Button variant="text">Text Button</Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>With Underline</span>
        <Button variant="text" underline>
          Text Button with Underline
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>With Icon</span>
        <Button variant="text" underline>
          Learn More
          <Button.RightIcon>
            <ArrowIcon />
          </Button.RightIcon>
        </Button>
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={{ ...rowStyle, gap: "24px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
            로그인 폼
          </h3>
          <Button variant="primary" size="default">
            로그인
          </Button>
          <Button variant="outline" size="default">
            회원가입
          </Button>
          <Button variant="text">비밀번호를 잊으셨나요?</Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
            액션 버튼
          </h3>
          <Button variant="secondary" size="small">
            <Button.LeftIcon>
              <HeartIcon />
            </Button.LeftIcon>
            좋아요
          </Button>
          <Button variant="outline" size="small">
            <Button.LeftIcon>
              <PlusIcon />
            </Button.LeftIcon>
            팔로우
          </Button>
          <Button variant="danger" size="small">
            삭제
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <Button
          variant="primary"
          size="small"
          onClick={() => console.log("Primary clicked!")}
        >
          Click Me
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => console.log("Secondary clicked!")}
        >
          <Button.LeftIcon>
            <HeartIcon />
          </Button.LeftIcon>
          Like
        </Button>
        <Button
          variant="text"
          underline
          onClick={() => console.log("Text button clicked!")}
        >
          Text Button
        </Button>
      </div>
    </div>
  ),
};
