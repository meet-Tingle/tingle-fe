import {
  forwardRef,
  type InputHTMLAttributes,
  memo,
  type ReactNode,
  useMemo,
} from "react";
import * as styles from "./Radio.css";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: ReactNode;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

export const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(
    (
      { label, size = "md", error = false, className, disabled, ...props },
      ref,
    ) => {
      const labelClassName = useMemo(() => {
        return [
          styles.radioLabel,
          styles.sizeVariants[size],
          error && styles.errorState,
          className,
        ]
          .filter(Boolean)
          .join(" ");
      }, [size, error, className]);

      return (
        <label className={labelClassName}>
          <input
            ref={ref}
            type="radio"
            disabled={disabled}
            className={styles.radioInput}
            {...props}
          />
          <span className={styles.radioText}>{label}</span>
        </label>
      );
    },
  ),
);

Radio.displayName = "Radio";
