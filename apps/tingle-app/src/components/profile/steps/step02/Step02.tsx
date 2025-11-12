import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step02.css";

export default function Step02() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.container}>
      <div className={styles.fieldContainer}>
        <Text size="md" weight="medium" color="gray_600">
          생년월일
        </Text>
        <Input
          size="full"
          type="date"
          placeholder="YYYY-MM-DD"
          max="9999-12-31"
          {...register("birthdate")}
        />
        {errors.birthdate ? (
          <span style={errorTextStyle}>{errors.birthdate.message}</span>
        ) : null}
      </div>
    </section>
  );
}
