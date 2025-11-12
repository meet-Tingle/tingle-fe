import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px 20px",
  boxSizing: "border-box",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
