import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step06() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          입학 연도
        </Text>
        <Input
          size="full"
          type="number"
          placeholder="예) 2021"
          {...register("studentId")}
        />
        {errors.studentId ? (
          <span style={errorTextStyle}>{errors.studentId.message}</span>
        ) : null}
      </div>
    </section>
  );
}
