import { CheckBox, Text, Textarea } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step08.css";

const INTEREST_OPTIONS = [
  "음악",
  "운동",
  "스터디",
  "여행",
  "게임",
  "맛집 탐방",
  "개발",
  "영화/드라마",
  "독서",
  "사진/영상",
  "요리",
  "카페",
  "패션",
  "공연/전시",
  "반려동물",
  "자동차",
];

export default function Step08() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <section className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.fieldContainer}>
          <Text size="md" weight="medium" color="gray_600">
            관심사 선택
          </Text>
          <div className={styles.checkboxGrid}>
            {INTEREST_OPTIONS.map((option) => (
              <CheckBox
                key={option}
                label={
                  <Text size="sm" weight="medium" color="gray_700">
                    {option}
                  </Text>
                }
                value={option}
                error={!!errors.interests}
                {...register("interests")}
              />
            ))}
          </div>
        </div>

        <div className={styles.textareaContainer}>
          <Text size="md" weight="medium" color="gray_600">
            직접 입력
          </Text>
          <Textarea
            rows={4}
            placeholder="관심사를 자유롭게 적어주세요"
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
