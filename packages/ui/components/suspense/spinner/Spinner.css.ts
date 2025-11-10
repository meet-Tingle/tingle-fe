import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import colors from "../../../token/color";

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const pulse = keyframes({
  "0%, 100%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.5,
  },
});

export const spinnerContainer = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const sizeVariants = styleVariants({
  small: {
    width: "16px",
    height: "16px",
  },
  medium: {
    width: "24px",
    height: "24px",
  },
  large: {
    width: "40px",
    height: "40px",
  },
});

export const circleSpinner = style({
  border: `3px solid ${colors.borderLight}`,
  borderTopColor: colors.primary,
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
});

export const dotsSpinner = style({
  display: "flex",
  gap: "6px",
  alignItems: "center",
});

export const dot = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: colors.primary,
  animation: `${pulse} 1.4s ease-in-out infinite`,
});

export const dot1 = style({
  animationDelay: "0s",
});

export const dot2 = style({
  animationDelay: "0.2s",
});

export const dot3 = style({
  animationDelay: "0.4s",
});
