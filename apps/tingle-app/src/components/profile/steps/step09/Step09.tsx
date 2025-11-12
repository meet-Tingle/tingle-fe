import { Radio, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step09.css";

export default function Step09() {
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
              재학생
            </Text>
          }
          value="student"
          size="lg"
          error={!!errors.graduationStatus}
          {...register("graduationStatus")}
        />
        <Radio
          label={
            <Text size="md" weight="medium" color="gray_700">
              졸업생
            </Text>
          }
          value="graduate"
          size="lg"
          error={!!errors.graduationStatus}
          {...register("graduationStatus")}
        />
        {errors.graduationStatus ? (
          <span style={errorTextStyle}>{errors.graduationStatus.message}</span>
        ) : null}
      </div>
    </section>
  );
}
