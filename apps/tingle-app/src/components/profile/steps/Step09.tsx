import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step09() {
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
          <input
            type="radio"
            value="student"
            {...register("graduationStatus")}
          />
          <Text size="md" weight="medium" color="gray_700">
            재학생
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
          <input
            type="radio"
            value="graduate"
            {...register("graduationStatus")}
          />
          <Text size="md" weight="medium" color="gray_700">
            졸업생
          </Text>
        </label>
        {errors.graduationStatus ? (
          <span style={errorTextStyle}>{errors.graduationStatus.message}</span>
        ) : null}
      </div>
    </section>
  );
}
