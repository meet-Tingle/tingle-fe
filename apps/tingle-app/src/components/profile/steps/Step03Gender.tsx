import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step03Gender({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <FormStepLayout
      title="성별을 선택해주세요"
      description="성별 정보는 매칭 추천에 활용돼요."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <input type="radio" value="male" {...register("gender")} />
          <Text size="md" weight="medium" color="gray_700">
            남성
          </Text>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <input type="radio" value="female" {...register("gender")} />
          <Text size="md" weight="medium" color="gray_700">
            여성
          </Text>
        </label>
        {errors.gender ? (
          <span style={errorTextStyle}>{errors.gender.message}</span>
        ) : null}
      </div>
    </FormStepLayout>
  );
}
