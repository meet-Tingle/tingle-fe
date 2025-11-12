import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step03() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <input type="radio" value="male" {...register("gender")} />
          <Text size="md" weight="medium" color="gray_700">
            남성
          </Text>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <input type="radio" value="female" {...register("gender")} />
          <Text size="md" weight="medium" color="gray_700">
            여성
          </Text>
        </label>
        {errors.gender ? (
          <span style={errorTextStyle}>{errors.gender.message}</span>
        ) : null}
      </div>
    </section>
  );
}
