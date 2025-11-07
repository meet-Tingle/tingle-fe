import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  viewTransitionName: "tingle-header",
});

export const logo = style({
  width: "160px",
  height: "160px",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});
