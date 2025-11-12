import { style, styleVariants } from "@vanilla-extract/css";
import colors from "../../token/color";

export const baseTextarea = style({
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.5,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.borderMedium}`,
  borderRadius: "12px",
  padding: "12px",
  outline: "none",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  width: "100%",
  resize: "vertical",
  minHeight: "80px",

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

export const resizeVariants = styleVariants({
  none: {
    resize: "none",
  },
  vertical: {
    resize: "vertical",
  },
  horizontal: {
    resize: "horizontal",
  },
  both: {
    resize: "both",
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
