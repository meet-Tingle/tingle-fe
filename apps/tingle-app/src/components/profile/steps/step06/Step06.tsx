import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step06.css";

export default function Step06() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.container}>
      <div className={styles.fieldContainer}>
        <Text size="md" weight="medium" color="gray_600">
          입학 연도
        </Text>
        <Input
          size="full"
          type="text"
          inputMode="numeric"
          placeholder="예) 2025"
          maxLength={4}
          {...register("studentId")}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, "").slice(0, 4);
          }}
        />
        {errors.studentId ? (
          <span style={errorTextStyle}>{errors.studentId.message}</span>
        ) : null}
      </div>
    </section>
  );
}
