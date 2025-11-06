import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Icon } from "../icon";
import { Input, type InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["full", "fit", "auto"],
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

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
  minWidth: "100px",
  fontWeight: 600,
  fontSize: "14px",
  color: "#374151",
};

// Icons for demos (email and lock icons not available in Icon component yet)
const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Email</title>
    <path
      d="M2 4L8 8L14 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="2"
      y="3"
      width="12"
      height="10"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Lock</title>
    <rect
      x="3"
      y="7"
      width="10"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// Default story
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    size: "full",
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Full Width:</span>
        <Input size="full" placeholder="Full width input" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Fit Content:</span>
        <Input size="fit" placeholder="Fit content input" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Auto:</span>
        <Input size="auto" placeholder="Auto width" />
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Default:</span>
        <Input placeholder="Default state" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Error:</span>
        <Input error placeholder="Error state" defaultValue="Invalid input" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Disabled:</span>
        <Input disabled placeholder="Disabled state" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>With Value:</span>
        <Input
          disabled
          placeholder="Disabled with value"
          defaultValue="Some value"
        />
      </div>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Left Icon:</span>
        <Input
          leftIcon={<Icon name="search" size={16} />}
          placeholder="Search..."
        />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Right Icon:</span>
        <Input rightIcon={<EmailIcon />} placeholder="Email address" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Both Icons:</span>
        <Input
          leftIcon={<LockIcon />}
          rightIcon={<EmailIcon />}
          placeholder="With both icons"
        />
      </div>
    </div>
  ),
};

// Clearable
export const Clearable: Story = {
  render: () => {
    const [value1, setValue1] = useState("Clear me!");
    const [value2, setValue2] = useState("");

    return (
      <div style={containerStyle}>
        <div style={rowStyle}>
          <span style={labelStyle}>Controlled:</span>
          <Input
            clearable
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            onClear={() => setValue1("")}
            placeholder="Type something..."
          />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Uncontrolled:</span>
          <Input
            clearable
            defaultValue="Clear me too!"
            placeholder="Type something..."
          />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>With Icon:</span>
          <Input
            clearable
            leftIcon={<Icon name="search" size={16} />}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            onClear={() => setValue2("")}
            placeholder="Search with clear..."
          />
        </div>
      </div>
    );
  },
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Text:</span>
        <Input type="text" placeholder="Enter text" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Email:</span>
        <Input
          type="email"
          leftIcon={<EmailIcon />}
          placeholder="email@example.com"
        />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Password:</span>
        <Input
          type="password"
          leftIcon={<LockIcon />}
          placeholder="Enter password"
        />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Number:</span>
        <Input type="number" placeholder="Enter number" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Tel:</span>
        <Input type="tel" placeholder="010-1234-5678" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>URL:</span>
        <Input type="url" placeholder="https://example.com" />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Search:</span>
        <Input
          type="search"
          leftIcon={<Icon name="search" size={16} />}
          clearable
          placeholder="Search..."
        />
      </div>
    </div>
  ),
};

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = useState("");

    return (
      <div style={containerStyle}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
          Controlled Input
        </h3>
        <div style={rowStyle}>
          <Input
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Controlled input"
            clearable
            onClear={() => setControlledValue("")}
          />
        </div>
        <p style={{ margin: 0, fontSize: "14px", color: "#6B7280" }}>
          Current value: {controlledValue || "(empty)"}
        </p>

        <hr style={{ border: "none", borderTop: "1px solid #E5E7EB" }} />

        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
          Uncontrolled Input
        </h3>
        <div style={rowStyle}>
          <Input
            defaultValue="Initial value"
            placeholder="Uncontrolled input"
            clearable
          />
        </div>
        <p style={{ margin: 0, fontSize: "14px", color: "#6B7280" }}>
          Value managed internally by the input
        </p>
      </div>
    );
  },
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState("");

    const emailError = !!(email && !email.includes("@"));

    return (
      <div style={containerStyle}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
          Login Form
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "4px",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              leftIcon={<EmailIcon />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              placeholder="Enter your email"
              clearable
              onClear={() => setEmail("")}
            />
            {emailError && (
              <span style={{ fontSize: "12px", color: "#EF4444" }}>
                Please enter a valid email
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "4px",
                fontSize: "14px",
              }}
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              leftIcon={<LockIcon />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #E5E7EB" }} />

        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
          Search Bar
        </h3>
        <Input
          type="search"
          leftIcon={<Icon name="search" size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          clearable
          onClear={() => setSearch("")}
          placeholder="Search for anything..."
        />
        {search && (
          <p style={{ margin: 0, fontSize: "14px", color: "#6B7280" }}>
            Searching for: <strong>{search}</strong>
          </p>
        )}
      </div>
    );
  },
};

// All States Showcase
export const AllStatesShowcase: Story = {
  render: () => (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        Input Component Showcase
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
            Basic States
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Input placeholder="Default" />
            <Input placeholder="With value" defaultValue="Some text" />
            <Input placeholder="Disabled" disabled />
            <Input
              placeholder="Disabled with value"
              disabled
              defaultValue="Cannot edit"
            />
            <Input placeholder="Error state" error defaultValue="Invalid" />
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>With Icons</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Input
              leftIcon={<Icon name="search" size={16} />}
              placeholder="Search..."
            />
            <Input
              leftIcon={<EmailIcon />}
              placeholder="email@example.com"
              clearable
              defaultValue="test@test.com"
            />
            <Input
              leftIcon={<LockIcon />}
              rightIcon={<EmailIcon />}
              placeholder="Both icons"
            />
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>Sizes</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Input size="full" placeholder="Full width (default)" />
            <Input size="fit" placeholder="Fit content" />
            <Input size="auto" placeholder="Auto" />
          </div>
        </div>
      </div>
    </div>
  ),
};
