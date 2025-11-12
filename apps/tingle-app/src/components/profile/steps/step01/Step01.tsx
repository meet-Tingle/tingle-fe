import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step01.css";

export default function Step01() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.container}>
      <div className={styles.fieldContainer}>
        <Text size="md" weight="medium" color="gray_600">
          닉네임
        </Text>
        <Input size="full" placeholder="예) 이강민" {...register("nickname")} />
        {errors.nickname ? (
          <span style={errorTextStyle}>{errors.nickname.message}</span>
        ) : null}
      </div>
    </section>
  );
}
