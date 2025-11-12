import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

const INTEREST_OPTIONS = [
  "음악",
  "운동",
  "스터디",
  "여행",
  "게임",
  "맛집 탐방",
];

export default function Step08() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const selected = watch("interests");

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Text size="md" weight="medium" color="gray_600">
            관심사 선택
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {INTEREST_OPTIONS.map((option) => {
              const isChecked = selected?.includes(option);
              return (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 14px",
                    border: `1px solid ${isChecked ? "#6366f1" : "#e5e7eb"}`,
                    borderRadius: "20px",
                    backgroundColor: isChecked ? "#eef2ff" : "white",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    {...register("interests")}
                  />
                  <Text size="sm" weight="medium" color="gray_700">
                    {option}
                  </Text>
                </label>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Text size="md" weight="medium" color="gray_600">
            직접 입력
          </Text>
          <textarea
            rows={4}
            placeholder="관심사를 자유롭게 적어주세요 (2자 이상)"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              resize: "vertical",
            }}
            {...register("interestsNote")}
          />
        </div>

        {errors.interests ? (
          <span style={errorTextStyle}>{errors.interests.message}</span>
        ) : null}
      </div>
    </section>
  );
}
