import { keyframes, style } from "@vanilla-extract/css";
import colors from "../../token/color";

const slideIn = keyframes({
  from: {
    transform: "translateY(-100%)",
    opacity: 0,
  },
  to: {
    transform: "translateY(0)",
    opacity: 1,
  },
});

const _slideOut = keyframes({
  from: {
    transform: "translateY(0)",
    opacity: 1,
  },
  to: {
    transform: "translateY(-100%)",
    opacity: 0,
  },
});

export const toastContainer = style({
  position: "fixed",
  top: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
  pointerEvents: "none",
  maxWidth: "90vw",
  width: "400px",
});

export const toast = style({
  backgroundColor: colors.gray[900],
  color: colors.white,
  padding: "12px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  pointerEvents: "auto",
  animation: `${slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  minWidth: "200px",
  textAlign: "center",
  wordBreak: "break-word",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  maxHeight: "200px",
  overflow: "hidden",
  transform: "scale(1)",
});

export const toastExiting = style({
  maxHeight: "0 !important",
  padding: "0 20px !important",
  marginTop: "0 !important",
  marginBottom: "0 !important",
  opacity: "0 !important",
  transform: "scale(0.8) !important",
});
