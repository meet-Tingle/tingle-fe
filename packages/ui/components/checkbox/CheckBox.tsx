import {
  forwardRef,
  type InputHTMLAttributes,
  memo,
  type ReactNode,
  useMemo,
} from "react";
import * as styles from "./CheckBox.css";

export interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "pill" | "rounded" | "square";
  error?: boolean;
}

export const CheckBox = memo(
  forwardRef<HTMLInputElement, CheckBoxProps>(
    (
      {
        label,
        size = "md",
        variant = "pill",
        error = false,
        className,
        disabled,
        ...props
      },
      ref,
    ) => {
      const labelClassName = useMemo(() => {
        return [
          styles.checkboxLabel,
          styles.sizeVariants[size],
          styles.variantStyles[variant],
          error && styles.errorState,
          className,
        ]
          .filter(Boolean)
          .join(" ");
      }, [size, variant, error, className]);

      return (
        <label className={labelClassName}>
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={styles.checkboxInput}
            {...props}
          />
          <span className={styles.checkboxText}>{label}</span>
        </label>
      );
    },
  ),
);

CheckBox.displayName = "CheckBox";
