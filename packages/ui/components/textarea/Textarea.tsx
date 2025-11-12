import { forwardRef, memo, type TextareaHTMLAttributes, useMemo } from "react";
import * as styles from "./Textarea.css";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: "full" | "fit" | "auto";
  resize?: "none" | "vertical" | "horizontal" | "both";
  error?: boolean;
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
      {
        size = "full",
        resize = "vertical",
        error = false,
        className,
        rows = 4,
        ...props
      },
      ref,
    ) => {
      const classNames = useMemo(() => {
        return [
          styles.baseTextarea,
          styles.sizeVariants[size],
          styles.resizeVariants[resize],
          error && styles.errorState,
          className,
        ]
          .filter(Boolean)
          .join(" ");
      }, [size, resize, error, className]);

      return (
        <textarea
          ref={ref}
          rows={rows}
          className={classNames}
          aria-invalid={error}
          {...props}
        />
      );
    },
  ),
);

Textarea.displayName = "Textarea";
