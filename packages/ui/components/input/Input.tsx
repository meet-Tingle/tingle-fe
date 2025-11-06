import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import * as styles from "./Input.css";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "full" | "fit" | "auto";
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "full",
      error = false,
      clearable = false,
      onClear,
      leftIcon,
      rightIcon,
      className,
      type = "text",
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;

    const hasClearButton = clearable && inputValue;
    const hasRightContent = rightIcon || hasClearButton;

    const classNames = [
      styles.baseInput,
      styles.sizeVariants[size],
      error && styles.errorState,
      leftIcon && styles.withLeftIcon,
      hasRightContent && styles.withRightIcon,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
    };

    return (
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          ref={ref}
          type={type}
          className={classNames}
          value={inputValue}
          onChange={handleChange}
          aria-invalid={error}
          {...props}
        />
        {rightIcon && !hasClearButton && (
          <span className={styles.rightIcon}>{rightIcon}</span>
        )}
        {hasClearButton && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Clear</title>
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
