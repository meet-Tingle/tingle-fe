import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  padding: "2rem 1.5rem",
});

export const headerGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  viewTransitionName: "tingle-header",
});

export const logo = style({
  width: "200px",
  height: "200px",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

export const pwaBadgeWrapper = style({
  marginTop: "2rem",
});
