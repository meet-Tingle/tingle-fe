import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import colors from "../../token/color";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  zIndex: 1000,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const sheet = style({
  backgroundColor: colors.bgPrimary,
  borderTopLeftRadius: "24px",
  borderTopRightRadius: "24px",
  width: "100%",
  maxWidth: "600px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
  animation: `${slideUp} 0.3s ease-out`,
  touchAction: "none",
  transition: "transform 0.2s ease-out",
  maxHeight: "90vh",
  position: "relative",
});

export const heightVariants = styleVariants({
  small: {
    height: "30vh",
  },
  medium: {
    height: "50vh",
  },
  large: {
    height: "80vh",
  },
  auto: {
    height: "auto",
    minHeight: "200px",
  },
});

export const handle = style({
  width: "40px",
  height: "4px",
  backgroundColor: colors.borderMedium,
  borderRadius: "2px",
  margin: "12px auto 8px",
  flexShrink: 0,
});

export const header = style({
  padding: "16px 24px",
  borderBottom: `1px solid ${colors.borderLight}`,
  flexShrink: 0,
});

export const title = style({
  margin: 0,
  fontSize: "18px",
  fontWeight: 600,
  color: colors.textPrimary,
  fontFamily: "system-ui, -apple-system, sans-serif",
});

export const content = style({
  padding: "24px",
  overflowY: "auto",
  flex: 1,
  fontSize: "14px",
  color: colors.textPrimary,
  fontFamily: "system-ui, -apple-system, sans-serif",

  selectors: {
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: colors.bgSecondary,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: colors.borderMedium,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: colors.borderStrong,
    },
  },
});

export const footer = style({
  padding: "16px 24px",
  borderTop: `1px solid ${colors.borderLight}`,
  flexShrink: 0,
  display: "flex",
  gap: "12px",
});
