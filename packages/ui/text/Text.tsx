import type { ReactNode } from "react";
import { textStyle } from "./Text.css.ts";

export interface TextProps {
  children: ReactNode;
  variant?: "body" | "caption";
}

export function Text({ children, variant = "body" }: TextProps) {
  return <span className={textStyle[variant]}>{children}</span>;
}
