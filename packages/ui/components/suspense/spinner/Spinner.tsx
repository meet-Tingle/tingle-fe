import { memo } from "react";
import * as styles from "./Spinner.css";

export interface SpinnerProps {
  size?: "small" | "medium" | "large";
  variant?: "circle" | "dots";
  className?: string;
}

export const Spinner = memo(function Spinner({
  size = "medium",
  variant = "circle",
  className,
}: SpinnerProps) {
  if (variant === "dots") {
    return (
      <div
        className={`${styles.spinnerContainer} ${className || ""}`.trim()}
        aria-live="polite"
        aria-busy="true"
      >
        <div className={styles.dotsSpinner}>
          <span className={`${styles.dot} ${styles.dot1}`} />
          <span className={`${styles.dot} ${styles.dot2}`} />
          <span className={`${styles.dot} ${styles.dot3}`} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.spinnerContainer} ${className || ""}`.trim()}
      aria-live="polite"
      aria-busy="true"
    >
      <div className={`${styles.sizeVariants[size]} ${styles.circleSpinner}`} />
    </div>
  );
});
