import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "24px 20px",
});

export const sectionContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const summaryGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
});

export const summaryItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #D1D5DB",
  backgroundColor: "#FFFFFF",
});

export const imageSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const selectedImageBox = style({
  height: "160px",
  borderRadius: "12px",
  border: "2px solid #0080FF",
  backgroundColor: "#E6F2FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const emptyImageBox = style({
  padding: "40px",
  borderRadius: "12px",
  border: "1px dashed #D1D5DB",
  textAlign: "center",
});
