import { Radio, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step04.css";

export default function Step04() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.container}>
      <div className={styles.sectionContainer}>
        {/* 에너지 방향 (E/I) */}
        <div className={styles.fieldContainer}>
          <Text size="md" weight="medium" color="gray_600">
            에너지 방향 (E/I)
          </Text>
          <div className={styles.radioGroup}>
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  E (외향)
                </Text>
              }
              value="E"
              error={!!errors.mbtiEI}
              {...register("mbtiEI")}
            />
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  I (내향)
                </Text>
              }
              value="I"
              error={!!errors.mbtiEI}
              {...register("mbtiEI")}
            />
          </div>
        </div>

        {/* 인식 방식 (S/N) */}
        <div className={styles.fieldContainer}>
          <Text size="md" weight="medium" color="gray_600">
            인식 방식 (S/N)
          </Text>
          <div className={styles.radioGroup}>
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  S (감각)
                </Text>
              }
              value="S"
              error={!!errors.mbtiSN}
              {...register("mbtiSN")}
            />
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  N (직관)
                </Text>
              }
              value="N"
              error={!!errors.mbtiSN}
              {...register("mbtiSN")}
            />
          </div>
        </div>

        {/* 판단 기준 (F/T) */}
        <div className={styles.fieldContainer}>
          <Text size="md" weight="medium" color="gray_600">
            판단 기준 (F/T)
          </Text>
          <div className={styles.radioGroup}>
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  F (감정)
                </Text>
              }
              value="F"
              error={!!errors.mbtiFT}
              {...register("mbtiFT")}
            />
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  T (사고)
                </Text>
              }
              value="T"
              error={!!errors.mbtiFT}
              {...register("mbtiFT")}
            />
          </div>
        </div>

        {/* 생활 양식 (P/J) */}
        <div className={styles.fieldContainer}>
          <Text size="md" weight="medium" color="gray_600">
            생활 양식 (P/J)
          </Text>
          <div className={styles.radioGroup}>
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  P (인식형)
                </Text>
              }
              value="P"
              error={!!errors.mbtiPJ}
              {...register("mbtiPJ")}
            />
            <Radio
              label={
                <Text size="md" weight="medium" color="gray_700">
                  J (판단형)
                </Text>
              }
              value="J"
              error={!!errors.mbtiPJ}
              {...register("mbtiPJ")}
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {(errors.mbtiEI || errors.mbtiSN || errors.mbtiFT || errors.mbtiPJ) && (
          <span style={errorTextStyle}>
            {errors.mbtiEI?.message ||
              errors.mbtiSN?.message ||
              errors.mbtiFT?.message ||
              errors.mbtiPJ?.message}
          </span>
        )}
      </div>
    </section>
  );
}
