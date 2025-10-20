import { style, styleVariants } from "@vanilla-extract/css";
import { colors } from "../token/color";

export const baseText = style({
  fontFamily: "system-ui, -apple-system, sans-serif",
  margin: 0,
  padding: 0,
});

export const sizeVariants = styleVariants({
  xs: {
    fontSize: "12px",
    lineHeight: 1.4,
  },
  sm: {
    fontSize: "14px",
    lineHeight: 1.5,
  },
  md: {
    fontSize: "16px",
    lineHeight: 1.5,
  },
  lg: {
    fontSize: "18px",
    lineHeight: 1.6,
  },
  xl: {
    fontSize: "20px",
    lineHeight: 1.6,
  },
  "2xl": {
    fontSize: "24px",
    lineHeight: 1.4,
  },
});

export const weightVariants = styleVariants({
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
  semibold: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
});

export const colorVariants = styleVariants({
  primary: {
    color: colors.primary,
  },
  secondary: {
    color: colors.secondary,
  },
  accent: {
    color: colors.accent,
  },
  success: {
    color: colors.success,
  },
  warning: {
    color: colors.warning,
  },
  error: {
    color: colors.error,
  },
  info: {
    color: colors.info,
  },
  gray_50: {
    color: colors.gray[50],
  },
  gray_100: {
    color: colors.gray[100],
  },
  gray_200: {
    color: colors.gray[200],
  },
  gray_300: {
    color: colors.gray[300],
  },
  gray_400: {
    color: colors.gray[400],
  },
  gray_500: {
    color: colors.gray[500],
  },
  gray_600: {
    color: colors.gray[600],
  },
  gray_700: {
    color: colors.gray[700],
  },
  gray_800: {
    color: colors.gray[800],
  },
  gray_900: {
    color: colors.gray[900],
  },
  white: {
    color: colors.white,
  },
  black: {
    color: colors.black,
  },
});

export const alignVariants = styleVariants({
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
});

export const decorationVariants = styleVariants({
  none: {
    textDecoration: "none",
  },
  underline: {
    textDecoration: "underline",
  },
  lineThrough: {
    textDecoration: "line-through",
  },
});
