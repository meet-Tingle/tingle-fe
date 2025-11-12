import {
  type MouseEvent,
  memo,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import * as styles from "./BottomSheet.css";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showHandle?: boolean;
  height?: "small" | "medium" | "large" | "auto";
  closeOnOverlayClick?: boolean;
  closeOnSwipeDown?: boolean;
}

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}

interface FooterProps {
  children: ReactNode;
  className?: string;
}

const BottomSheetRoot = memo(function BottomSheetRoot({
  isOpen,
  onClose,
  children,
  title,
  showHandle = true,
  height = "medium",
  closeOnOverlayClick = true,
  closeOnSwipeDown = true,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose],
  );

  // Handle overlay keyboard event
  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && (e.key === "Escape" || e.key === "Esc")) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose],
  );

  // Handle swipe gestures
  const handleTouchStart = useCallback((e: TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startYRef.current;

    // Only allow swipe down
    if (deltaY > 0) {
      currentYRef.current = deltaY;
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Close if swiped down more than 100px
    if (closeOnSwipeDown && currentYRef.current > 100) {
      onClose();
    }

    // Reset position
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    currentYRef.current = 0;
  }, [closeOnSwipeDown, onClose]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet || !closeOnSwipeDown) return;

    sheet.addEventListener("touchstart", handleTouchStart);
    sheet.addEventListener("touchmove", handleTouchMove);
    sheet.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.removeEventListener("touchstart", handleTouchStart);
      sheet.removeEventListener("touchmove", handleTouchMove);
      sheet.removeEventListener("touchend", handleTouchEnd);
    };
  }, [closeOnSwipeDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useSemanticElements: Modal backdrop overlay requires button role for dismissal with click and keyboard
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={-1}
      aria-label="Close bottom sheet"
    >
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${styles.heightVariants[height]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "bottom-sheet-title" : undefined}
      >
        {showHandle && <div className={styles.handle} />}
        {title && (
          <div className={styles.header}>
            <h2 id="bottom-sheet-title" className={styles.title}>
              {title}
            </h2>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
});

function Header({ children, className }: HeaderProps) {
  return (
    <div className={`${styles.header} ${className || ""}`.trim()}>
      {children}
    </div>
  );
}

function Content({ children, className }: ContentProps) {
  return (
    <div className={`${styles.content} ${className || ""}`.trim()}>
      {children}
    </div>
  );
}

function Footer({ children, className }: FooterProps) {
  return (
    <div className={`${styles.footer} ${className || ""}`.trim()}>
      {children}
    </div>
  );
}

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Header,
  Content,
  Footer,
});
