import { globalStyle, style } from "@vanilla-extract/css";

const MAX_WIDTH = 480;
const MIN_WIDTH = 320;

export const appContainer = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
  minWidth: `${MIN_WIDTH}px`,
  maxWidth: `${MAX_WIDTH}px`,
  minHeight: "100vh",
  "@media": {
    [`(min-width: ${MAX_WIDTH + 1}px)`]: {
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    },
  },
});

// View Transitions API 커스터마이징
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
