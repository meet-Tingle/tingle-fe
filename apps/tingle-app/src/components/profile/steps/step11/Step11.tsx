import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step11.css";

export default function Step11() {
  const {
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const values = watch();
  const mbti = `${values.mbtiEI}${values.mbtiSN}${values.mbtiFT}${values.mbtiPJ}`;
  const hasSelectedImage = Boolean(values.selectedImage);

  return (
    <section className={styles.container}>
      <div className={styles.sectionContainer}>
        <section className={styles.summaryGrid}>
          <SummaryItem label="닉네임" value={values.nickname} />
          <SummaryItem label="생년월일" value={values.birthdate} />
          <SummaryItem
            label="성별"
            value={values.gender === "male" ? "남성" : "여성"}
          />
          <SummaryItem label="MBTI" value={mbti} />
          <SummaryItem label="학과" value={values.department} />
          <SummaryItem label="입학 연도" value={values.studentId} />
          <SummaryItem label="카카오톡 ID" value={values.kakaoId} />
          <SummaryItem
            label="관심사"
            value={
              values.interests.length > 0
                ? values.interests.join(", ")
                : values.interestsNote || "입력된 관심사가 없어요"
            }
          />
          <SummaryItem
            label="재학 여부"
            value={values.graduationStatus === "student" ? "재학생" : "졸업생"}
          />
        </section>

        <section className={styles.imageSection}>
          <Text size="md" weight="medium" color="gray_600">
            선택한 AI 이미지
          </Text>
          {hasSelectedImage ? (
            <div className={styles.selectedImageBox}>
              <Text size="md" weight="medium" color="blue_600">
                {values.selectedImage}
              </Text>
            </div>
          ) : (
            <div className={styles.emptyImageBox}>
              <Text size="md" weight="medium" color="gray_400">
                AI 이미지가 선택되면 대학교 인증 버튼을 활성화할 수 있어요.
              </Text>
            </div>
          )}
          {errors.selectedImage ? (
            <span style={errorTextStyle}>{errors.selectedImage.message}</span>
          ) : null}
        </section>
      </div>
    </section>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className={styles.summaryItem}>
      <Text size="sm" weight="medium" color="gray_500">
        {label}
      </Text>
      <Text size="md" weight="bold" color="gray_700">
        {value || "-"}
      </Text>
    </div>
  );
}
