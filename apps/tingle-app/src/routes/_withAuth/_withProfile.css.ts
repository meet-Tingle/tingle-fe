import { style } from "@vanilla-extract/css";

export const loadingContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "40px 24px",
  gap: "32px",
});
