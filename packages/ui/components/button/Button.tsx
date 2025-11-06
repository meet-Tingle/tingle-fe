import {
  type ButtonHTMLAttributes,
  memo,
  type ReactNode,
  useMemo,
} from "react";
import * as styles from "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "text";
  size?: "default" | "small" | "fit";
  underline?: boolean;
  disabled?: boolean;
}

interface IconProps {
  children: ReactNode;
  className?: string;
}

const ButtonRoot = memo(function ButtonRoot({
  children,
  variant = "primary",
  size = "default",
  underline = false,
  disabled = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classNames = useMemo(() => {
    return [
      styles.baseButton,
      variant !== "text" && styles.sizeVariants[size],
      styles.variantStyles[variant],
      disabled && styles.disabled,
      variant === "text" && underline && styles.underline,
      className,
    ]
      .filter(Boolean)
      .join(" ");
  }, [variant, size, underline, disabled, className]);

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

function LeftIcon({ children, className }: IconProps) {
  return (
    <span className={`${styles.leftIcon} ${className || ""}`.trim()}>
      {children}
    </span>
  );
}

function RightIcon({ children, className }: IconProps) {
  return (
    <span className={`${styles.rightIcon} ${className || ""}`.trim()}>
      {children}
    </span>
  );
}

export const Button = Object.assign(ButtonRoot, {
  LeftIcon,
  RightIcon,
});
