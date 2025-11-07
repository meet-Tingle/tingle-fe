import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
  gap: "10px",
});
