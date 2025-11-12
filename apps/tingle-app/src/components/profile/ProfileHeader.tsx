import { Text } from "@tingle/ui";
import * as styles from "./ProfileHeader.css";

type ProfileHeaderProps = {
  title: string;
  description?: string;
  stepIndex: number;
  totalSteps: number;
};

export const ProfileHeader = ({
  title,
  description,
  stepIndex,
  totalSteps,
}: ProfileHeaderProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Text size="sm" weight="medium" color="gray_500">
          STEP {stepIndex + 1} / {totalSteps}
        </Text>
        <Text as="h2" size="2xl" weight="bold" color="gray_700">
          {title}
        </Text>
        {description ? (
          <Text size="md" weight="medium" color="gray_500">
            {description}
          </Text>
        ) : null}
      </header>
    </div>
  );
};
