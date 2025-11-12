import { Text } from "@tingle/ui";
import type { CSSProperties } from "react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

const groupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
};

export default function Step04() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Text size="md" weight="medium" color="gray_600">
            에너지 방향 (E/I)
          </Text>
          <div style={{ display: "flex", gap: "12px" }}>
            <label style={groupStyle}>
              <input type="radio" value="E" {...register("mbtiEI")} />
              <Text size="md" weight="medium" color="gray_700">
                E (외향)
              </Text>
            </label>
            <label style={groupStyle}>
              <input type="radio" value="I" {...register("mbtiEI")} />
              <Text size="md" weight="medium" color="gray_700">
                I (내향)
              </Text>
            </label>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Text size="md" weight="medium" color="gray_600">
            인식 방식 (S/N)
          </Text>
          <div style={{ display: "flex", gap: "12px" }}>
            <label style={groupStyle}>
              <input type="radio" value="S" {...register("mbtiSN")} />
              <Text size="md" weight="medium" color="gray_700">
                S (감각)
              </Text>
            </label>
            <label style={groupStyle}>
              <input type="radio" value="N" {...register("mbtiSN")} />
              <Text size="md" weight="medium" color="gray_700">
                N (직관)
              </Text>
            </label>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Text size="md" weight="medium" color="gray_600">
            판단 기준 (F/T)
          </Text>
          <div style={{ display: "flex", gap: "12px" }}>
            <label style={groupStyle}>
              <input type="radio" value="F" {...register("mbtiFT")} />
              <Text size="md" weight="medium" color="gray_700">
                F (감정)
              </Text>
            </label>
            <label style={groupStyle}>
              <input type="radio" value="T" {...register("mbtiFT")} />
              <Text size="md" weight="medium" color="gray_700">
                T (사고)
              </Text>
            </label>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Text size="md" weight="medium" color="gray_600">
            생활 양식 (P/J)
          </Text>
          <div style={{ display: "flex", gap: "12px" }}>
            <label style={groupStyle}>
              <input type="radio" value="P" {...register("mbtiPJ")} />
              <Text size="md" weight="medium" color="gray_700">
                P (인식형)
              </Text>
            </label>
            <label style={groupStyle}>
              <input type="radio" value="J" {...register("mbtiPJ")} />
              <Text size="md" weight="medium" color="gray_700">
                J (판단형)
              </Text>
            </label>
          </div>
        </div>

        {errors.mbtiEI ? (
          <span style={errorTextStyle}>{errors.mbtiEI.message}</span>
        ) : null}
      </div>
    </section>
  );
}
