import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "24px 20px",
});

export const fieldContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const bottomSheetContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  height: "100%",
});

export const selectionContainer = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  height: "100%",
  minHeight: 0,
});

export const selectionColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minHeight: 0,
});

export const columnTitle = style({
  padding: "0 4px",
  flexShrink: 0,
});

export const optionList = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  overflowY: "auto",
  flex: 1,
  minHeight: 0,

  selectors: {
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#F3F4F6",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D1D5DB",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#9CA3AF",
    },
  },
});

export const optionItem = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "background-color 0.2s",
  textAlign: "left",
  width: "100%",

  ":hover": {
    backgroundColor: "#F3F4F6",
  },

  ":active": {
    backgroundColor: "#E5E7EB",
  },
});

export const optionItemActive = style({
  backgroundColor: "#E6F2FF",

  ":hover": {
    backgroundColor: "#CCE5FF",
  },
});

export const radioCircle = style({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: "2px solid #D1D5DB",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "border-color 0.2s",

  selectors: {
    [`${optionItemActive} &`]: {
      borderColor: "#0080FF",
    },
  },
});

export const radioCircleInner = style({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "#0080FF",
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
});
