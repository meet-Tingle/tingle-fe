import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "#fff",
});

export const contentWrapper = style({
  width: "100%",
  maxWidth: "480px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

export const titleSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  textAlign: "center",
});

export const title = style({
  fontSize: "24px",
  fontWeight: "600",
  color: "#000",
  margin: 0,
});

export const description = style({
  fontSize: "14px",
  color: "#666",
  margin: 0,
  whiteSpace: "pre-line",
});

export const emailInfo = style({
  fontSize: "14px",
  fontWeight: "500",
  color: "#333",
  padding: "12px 16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  textAlign: "center",
  wordBreak: "break-all",
});

export const formSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

export const inputWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  border: "1px solid #e5e5e5",
});

export const label = style({
  fontSize: "14px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "4px",
});

export const inputContainer = style({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const codeInput = style({
  flex: 1,
});

export const resendButton = style({
  whiteSpace: "nowrap",
});

export const errorMessage = style({
  fontSize: "12px",
  color: "#e74c3c",
  marginTop: "6px",
  fontWeight: "500",
});

export const successMessage = style({
  fontSize: "12px",
  color: "#27ae60",
  marginTop: "6px",
  fontWeight: "500",
});

export const buttonGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
});

export const timerText = style({
  padding: "10px 12px",
  backgroundColor: "#f0f9ff",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#0066cc",
  textAlign: "center",
  marginTop: "12px",
  transition: "all 0.2s ease",
});

export const timerExpired = style({
  backgroundColor: "#fff5f5",
  color: "#e74c3c",
  borderRadius: "6px",
});
