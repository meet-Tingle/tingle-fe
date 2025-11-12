import { style, styleVariants } from "@vanilla-extract/css";
import colors from "../../token/color";

export const radioLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  border: `1px solid ${colors.borderMedium}`,
  borderRadius: "12px",
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

export const radioInput = style({
  appearance: "none",
  width: "20px",
  height: "20px",
  border: `2px solid ${colors.borderMedium}`,
  borderRadius: "50%",
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
    transform: "translate(-50%, -50%) scale(0)",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    transition: "transform 0.2s ease",
  },

  ":checked": {
    borderColor: colors.primary,
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
      transform: "translate(-50%, -50%) scale(1)",
    },
    "&:disabled::before": {
      backgroundColor: colors.textDisabled,
    },
  },
});

export const radioText = style({
  userSelect: "none",
});

export const sizeVariants = styleVariants({
  sm: {
    padding: "8px",
    flex: 1,
    minWidth: 0,
    justifyContent: "flex-start",
  },
  md: {
    padding: "12px",
    flex: 1,
    minWidth: 0,
    justifyContent: "flex-start",
  },
  lg: {
    padding: "16px",
    flex: 1,
    minWidth: 0,
    justifyContent: "flex-start",
  },
  fit: {
    padding: "12px",
    flex: "0 0 auto",
    width: "fit-content",
    justifyContent: "flex-start",
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
