import { style, styleVariants } from "@vanilla-extract/css";
import colors from "../../token/color";

export const inputWrapper = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  width: "100%",
});

export const baseInput = style({
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.borderMedium}`,
  borderRadius: "8px",
  padding: "10px 12px",
  outline: "none",
  transition: "all 0.2s ease",
  boxSizing: "border-box",

  "::placeholder": {
    color: colors.textTertiary,
  },

  ":hover": {
    borderColor: colors.borderStrong,
  },

  ":focus": {
    borderColor: colors.focus,
    boxShadow: `0 0 0 3px ${colors.infoLight}`,
  },

  ":disabled": {
    backgroundColor: colors.disabled,
    color: colors.textDisabled,
    cursor: "not-allowed",
    borderColor: colors.borderLight,
  },

  selectors: {
    "&:disabled:hover": {
      borderColor: colors.borderLight,
    },

    "&::-webkit-date-and-time-value": {
      textAlign: "left",
    },
    "&::-webkit-datetime-edit": {
      padding: 0,
    },
    "&::-webkit-datetime-edit-fields-wrapper": {
      padding: 0,
    },
    "&::-webkit-calendar-picker-indicator": {
      cursor: "pointer",
      marginLeft: "4px",
    },
  },
});

export const sizeVariants = styleVariants({
  full: {
    width: "100%",
  },
  fit: {
    width: "fit-content",
  },
  auto: {
    width: "auto",
  },
});

export const errorState = style({
  borderColor: colors.error,

  ":focus": {
    borderColor: colors.error,
    boxShadow: `0 0 0 3px ${colors.errorLight}`,
  },

  ":hover": {
    borderColor: colors.error,
  },
});

export const withLeftIcon = style({
  paddingLeft: "40px",
});

export const withRightIcon = style({
  paddingRight: "40px",
});

export const withClearButton = style({
  paddingRight: "40px",
});

export const iconContainer = style({
  position: "absolute",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  pointerEvents: "none",
  color: colors.textSecondary,
});

export const leftIcon = style([
  iconContainer,
  {
    left: "12px",
  },
]);

export const rightIcon = style([
  iconContainer,
  {
    right: "12px",
  },
]);

export const clearButton = style({
  position: "absolute",
  right: "8px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  padding: "0",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "transparent",
  color: colors.textSecondary,
  cursor: "pointer",
  transition: "all 0.2s ease",
  pointerEvents: "auto",

  ":hover": {
    backgroundColor: colors.hover,
    color: colors.textPrimary,
  },

  ":focus-visible": {
    outline: `2px solid ${colors.focus}`,
    outlineOffset: "2px",
  },
});
