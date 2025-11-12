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
  gap: "12px",
});

export const checkboxGrid = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
});

export const textareaContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
