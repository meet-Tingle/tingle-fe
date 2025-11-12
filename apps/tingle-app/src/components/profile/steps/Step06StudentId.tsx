import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step06StudentId({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <FormStepLayout
      title="입학 연도를 알려주세요"
      description="입학 연도는 4자리 숫자로 입력해주세요."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          입학 연도
        </Text>
        <Input
          size="full"
          type="number"
          placeholder="예) 2021"
          {...register("studentId")}
        />
        {errors.studentId ? (
          <span style={errorTextStyle}>{errors.studentId.message}</span>
        ) : null}
      </div>
    </FormStepLayout>
  );
}
