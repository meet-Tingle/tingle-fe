import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step11Summary({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const values = watch();
  const mbti = `${values.mbtiEI}${values.mbtiSN}${values.mbtiFT}${values.mbtiPJ}`;
  const hasSelectedImage = Boolean(values.selectedImage);

  return (
    <FormStepLayout
      title="입력 내용을 확인해주세요"
      description="선택한 이미지와 정보를 검토한 뒤, 대학교 인증 단계로 이동할 수 있어요."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "12px",
          }}
        >
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

        <section
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Text size="md" weight="medium" color="gray_600">
            선택한 AI 이미지
          </Text>
          {hasSelectedImage ? (
            <div
              style={{
                height: "160px",
                borderRadius: "16px",
                border: "2px solid #6366f1",
                backgroundColor: "#eef2ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4b5563",
              }}
            >
              {values.selectedImage}
            </div>
          ) : (
            <div
              style={{
                padding: "40px",
                borderRadius: "16px",
                border: "1px dashed #cbd5f5",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              AI 이미지가 선택되면 대학교 인증 버튼을 활성화할 수 있어요.
            </div>
          )}
          {errors.selectedImage ? (
            <span style={errorTextStyle}>{errors.selectedImage.message}</span>
          ) : null}
        </section>
      </div>
    </FormStepLayout>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <Text size="sm" weight="medium" color="gray_500">
        {label}
      </Text>
      <Text size="md" weight="bold" color="gray_700">
        {value || "-"}
      </Text>
    </div>
  );
}
