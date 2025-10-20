import { style, styleVariants } from "@vanilla-extract/css";

const baseText = style({
  fontFamily: "system-ui, sans-serif",
  margin: 0,
  padding: 0,
});

export const textStyle = styleVariants({
  body: [
    baseText,
    {
      fontSize: "16px",
      lineHeight: 1.5,
      color: "#333",
    },
  ],
  caption: [
    baseText,
    {
      fontSize: "12px",
      lineHeight: 1.4,
      color: "#666",
    },
  ],
});
