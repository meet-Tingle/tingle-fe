import { style, styleVariants } from "@vanilla-extract/css";
import colors from "../../token/color";

export const baseButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  transition: "all 0.2s ease",
  outline: "none",
  userSelect: "none",

  ":focus-visible": {
    outline: `2px solid ${colors.focus}`,
    outlineOffset: "2px",
  },

  ":active": {
    transform: "scale(0.98)",
  },
});

export const sizeVariants = styleVariants({
  default: {
    width: "100%",
    padding: "10px 16px",
  },
  small: {
    width: "fit-content",
    fontSize: "12px",
    padding: "8px 12px",
  },
  fit: {
    width: "fit-content",
    padding: "8px 12px",
  },
});

export const variantStyles = styleVariants({
  primary: {
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    ":hover": {
      backgroundColor: colors.primaryDark,
    },
    ":disabled": {
      backgroundColor: colors.disabled,
      color: colors.textDisabled,
      cursor: "not-allowed",
    },
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.textOnSecondary,
    ":hover": {
      backgroundColor: colors.secondaryDark,
    },
    ":disabled": {
      backgroundColor: colors.disabled,
      color: colors.textDisabled,
      cursor: "not-allowed",
    },
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    ":hover": {
      backgroundColor: colors.primaryLight,
    },
    ":disabled": {
      backgroundColor: "transparent",
      color: colors.textDisabled,
      borderColor: colors.borderLight,
      cursor: "not-allowed",
    },
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.textPrimary,
    ":hover": {
      backgroundColor: colors.hover,
    },
    ":disabled": {
      backgroundColor: "transparent",
      color: colors.textDisabled,
      cursor: "not-allowed",
    },
  },
  danger: {
    backgroundColor: colors.error,
    color: colors.white,
    ":hover": {
      backgroundColor: "#DC2626",
    },
    ":disabled": {
      backgroundColor: colors.disabled,
      color: colors.textDisabled,
      cursor: "not-allowed",
    },
  },
  text: {
    backgroundColor: "transparent",
    color: colors.primary,
    padding: "0",
    height: "auto",
    fontWeight: 500,
    ":hover": {
      opacity: 0.8,
    },
    ":disabled": {
      color: colors.textDisabled,
      cursor: "not-allowed",
    },
  },
});

export const disabled = style({
  pointerEvents: "none",
  opacity: 0.6,
});

export const underline = style({
  textDecoration: "underline",
});

export const iconContainer = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const leftIcon = style([
  iconContainer,
  {
    marginRight: "-4px",
  },
]);

export const rightIcon = style([
  iconContainer,
  {
    marginLeft: "-4px",
  },
]);
