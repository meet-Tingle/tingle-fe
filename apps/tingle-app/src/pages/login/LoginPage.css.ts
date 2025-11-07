import { keyframes, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "40px 24px",
  gap: "32px",
});

const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(20px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const formContainer = style({
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  animation: `${fadeInUp} 0.3s ease forwards`,
});

export const inputWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const label = style({
  fontSize: "14px",
  fontWeight: 600,
  color: "#374151",
});

export const buttonGroup = style({
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const linkText = style({
  textAlign: "center",
  marginTop: "16px",
});

export const errorMessage = style({
  fontSize: "12px",
  color: "#EF4444",
  marginTop: "4px",
});
