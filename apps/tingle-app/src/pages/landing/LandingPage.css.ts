import { globalStyle, style } from "@vanilla-extract/css";

globalStyle(
  "::view-transition-old(tingle-header), ::view-transition-new(tingle-header)",
  {
    animationDuration: "0.3s",
    animationTimingFunction: "ease-in-out",
  },
);

globalStyle("::view-transition-old(root)", {
  animationDuration: "0.3s",
});

globalStyle("::view-transition-new(root)", {
  animationDuration: "0.3s",
});

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

export const pwaBadgeWrapper = style({
  marginTop: "2rem",
});
