import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step02Birthdate() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          생년월일
        </Text>
        <Input
          size="full"
          type="date"
          placeholder="YYYY-MM-DD"
          {...register("birthdate")}
        />
        {errors.birthdate ? (
          <span style={errorTextStyle}>{errors.birthdate.message}</span>
        ) : null}
      </div>
    </section>
  );
}
