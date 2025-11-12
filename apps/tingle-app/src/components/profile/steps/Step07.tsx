import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step07() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          카카오톡 ID
        </Text>
        <Input
          size="full"
          placeholder="예) tingle1234"
          {...register("kakaoId")}
        />
        {errors.kakaoId ? (
          <span style={errorTextStyle}>{errors.kakaoId.message}</span>
        ) : null}
      </div>
    </section>
  );
}
