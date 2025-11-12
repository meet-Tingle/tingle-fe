import { style, styleVariants } from "@vanilla-extract/css";
import colors from "../../token/color";

export const checkboxLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 14px",
  border: `1px solid ${colors.borderMedium}`,
  borderRadius: "20px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: colors.white,
  WebkitTapHighlightColor: "transparent",
  userSelect: "none",

  ":hover": {
    borderColor: colors.borderStrong,
    backgroundColor: colors.bgSecondary,
  },

  selectors: {
    "&:has(input:checked)": {
      borderColor: colors.primary,
      backgroundColor: colors.infoLight,
    },
    "&:has(input:disabled)": {
      cursor: "not-allowed",
      backgroundColor: colors.disabled,
      borderColor: colors.borderLight,
    },
    "&:has(input:disabled):hover": {
      backgroundColor: colors.disabled,
      borderColor: colors.borderLight,
    },
  },
});

export const checkboxInput = style({
  appearance: "none",
  width: "18px",
  height: "18px",
  border: `2px solid ${colors.borderMedium}`,
  borderRadius: "4px",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.2s ease",
  flexShrink: 0,
  WebkitTapHighlightColor: "transparent",

  "::before": {
    content: "",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0) rotate(45deg)",
    width: "5px",
    height: "9px",
    borderRight: `2px solid ${colors.white}`,
    borderBottom: `2px solid ${colors.white}`,
    transition: "transform 0.2s ease",
  },

  ":checked": {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  ":focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${colors.infoLight}`,
  },

  ":disabled": {
    cursor: "not-allowed",
    borderColor: colors.borderLight,
    backgroundColor: colors.disabled,
  },

  selectors: {
    "&:checked::before": {
      transform: "translate(-50%, -50%) scale(1) rotate(45deg)",
    },
    "&:disabled::before": {
      borderColor: colors.textDisabled,
    },
  },
});

export const checkboxText = style({
  userSelect: "none",
});

export const sizeVariants = styleVariants({
  sm: {
    padding: "6px 10px",
    fontSize: "13px",
  },
  md: {
    padding: "10px 14px",
    fontSize: "14px",
  },
  lg: {
    padding: "12px 18px",
    fontSize: "16px",
  },
});

export const errorState = style({
  borderColor: colors.error,

  ":hover": {
    borderColor: colors.error,
  },

  selectors: {
    "&:has(input:checked)": {
      borderColor: colors.error,
      backgroundColor: colors.errorLight,
    },
  },
});

export const variantStyles = styleVariants({
  pill: {
    borderRadius: "20px",
  },
  rounded: {
    borderRadius: "8px",
  },
  square: {
    borderRadius: "4px",
  },
});
