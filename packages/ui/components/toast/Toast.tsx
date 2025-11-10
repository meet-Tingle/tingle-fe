import { memo, useEffect, useState } from "react";
import * as styles from "./Toast.css";

export interface ToastItemProps {
  id: string;
  message: string;
  duration: number;
  onRemove: (id: string) => void;
}

export const ToastItem = memo(function ToastItem({
  id,
  message,
  duration,
  onRemove,
}: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    const removeTimer = setTimeout(() => {
      onRemove(id);
    }, duration + 300); // 애니메이션 시간 추가

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [id, duration, onRemove]);

  return (
    <div
      className={
        isExiting ? `${styles.toast} ${styles.toastExiting}` : styles.toast
      }
    >
      {message}
    </div>
  );
});

export interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; duration: number }>;
  onRemove: (id: string) => void;
}

export const ToastContainer = memo(function ToastContainer({
  toasts,
  onRemove,
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          duration={toast.duration}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
});
