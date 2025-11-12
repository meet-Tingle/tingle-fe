import { style } from "@vanilla-extract/css";

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
  height: "100dvh",
  overflow: "auto",
  "@media": {
    [`(min-width: ${MAX_WIDTH + 1}px)`]: {
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    },
  },
});
