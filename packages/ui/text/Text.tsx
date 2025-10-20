import type { ReactNode } from "react";
import {
  alignVariants,
  baseText,
  colorVariants,
  decorationVariants,
  sizeVariants,
  weightVariants,
} from "./Text.css";

export interface TextProps {
  children: ReactNode;
  size?: keyof typeof sizeVariants;
  weight?: keyof typeof weightVariants;
  color?: keyof typeof colorVariants;
  align?: keyof typeof alignVariants;
  decoration?: keyof typeof decorationVariants;
  as?: "p" | "span" | "div" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export function Text({
  children,
  size = "md",
  weight = "regular",
  color = "primary",
  align = "left",
  decoration = "none",
  as: Component = "span",
  className,
}: TextProps) {
  const classNames = [
    baseText,
    sizeVariants[size],
    weightVariants[weight],
    colorVariants[color],
    alignVariants[align],
    decorationVariants[decoration],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classNames}>{children}</Component>;
}
