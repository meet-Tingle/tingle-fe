import { Button } from "@tingle/ui";
import * as styles from "./ProfileFooter.css";

export const ProfileFooter = ({
  isFirstStep,
  isLastStep,
  canProceed,
  handlePrev,
  handleNext,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  return (
    <footer className={styles.footer}>
      {isFirstStep ? (
        <span className={styles.spacer} />
      ) : (
        <Button type="button" variant="ghost" onClick={handlePrev}>
          이전
        </Button>
      )}

      {isLastStep ? (
        <Button
          type="submit"
          variant="primary"
          disabled={!canProceed}
          className={styles.button}
        >
          대학교 인증하러 가기
        </Button>
      ) : (
        <Button
          type="button"
          variant="primary"
          onClick={handleNext}
          className={styles.button}
        >
          다음
        </Button>
      )}
    </footer>
  );
};
