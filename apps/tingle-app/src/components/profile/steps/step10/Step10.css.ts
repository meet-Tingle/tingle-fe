import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "24px 20px",
});

export const sectionContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const fieldContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const buttonContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
});

export const imageGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "12px",
});

export const imageButton = style({
  height: "120px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  WebkitTapHighlightColor: "transparent",
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed #cbd5f5",
  borderRadius: "16px",
  padding: "40px",
  textAlign: "center",
});
