import { Radio, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step03.css";

export default function Step03() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.container}>
      <div className={styles.radioContainer}>
        <Radio
          label={
            <Text size="md" weight="medium" color="gray_700">
              남성
            </Text>
          }
          value="male"
          size="lg"
          error={!!errors.gender}
          {...register("gender")}
        />
        <Radio
          label={
            <Text size="md" weight="medium" color="gray_700">
              여성
            </Text>
          }
          value="female"
          size="lg"
          error={!!errors.gender}
          {...register("gender")}
        />
        {errors.gender ? (
          <span style={errorTextStyle}>{errors.gender.message}</span>
        ) : null}
      </div>
    </section>
  );
}
