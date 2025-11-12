import type { ReactNode } from "react";
import { ProfileHeader } from "../ProfileHeader";
import * as styles from "./FormStepLayout.css";

export type FormStepLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  stepIndex: number;
  totalSteps: number;
};

export default function FormStepLayout({
  title,
  description,
  children,
  stepIndex,
  totalSteps,
}: FormStepLayoutProps) {
  return (
    <div className={styles.container}>
      <ProfileHeader
        title={title}
        description={description}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
      />

      <section className={styles.content}>{children}</section>
    </div>
  );
}
