import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step01() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          닉네임
        </Text>
        <Input
          size="full"
          placeholder="예) tingle_lover"
          {...register("nickname")}
        />
        {errors.nickname ? (
          <span style={errorTextStyle}>{errors.nickname.message}</span>
        ) : null}
      </div>
    </section>
  );
}
