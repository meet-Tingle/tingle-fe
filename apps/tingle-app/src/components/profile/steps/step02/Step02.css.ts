import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px 20px",
  flex: 1,
  boxSizing: "border-box",
});

export const fieldContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
