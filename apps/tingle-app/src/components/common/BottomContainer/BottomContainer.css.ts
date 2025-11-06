import { style } from "@vanilla-extract/css";

const BOTTOM_CONTAINER_HEIGHT = 80;

export const root = style({
  display: "contents",
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  paddingBottom: `${BOTTOM_CONTAINER_HEIGHT}px`,
  minHeight: "100vh",
  boxSizing: "border-box",
});

export const bottomContainer = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: `${BOTTOM_CONTAINER_HEIGHT}px`,
  padding: "12px 16px",
  backgroundColor: "white",
  borderTop: "1px solid #e0e0e0",
  boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  zIndex: 100,
  maxWidth: "480px",
  margin: "0 auto",
  flexDirection: "column",
});
