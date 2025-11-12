import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step07KakaoId({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <FormStepLayout
      title="카카오톡 ID를 입력해주세요"
      description="상대와 연결될 카카오톡 ID를 입력해주세요."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          카카오톡 ID
        </Text>
        <Input
          size="full"
          placeholder="예) tingle1234"
          {...register("kakaoId")}
        />
        {errors.kakaoId ? (
          <span style={errorTextStyle}>{errors.kakaoId.message}</span>
        ) : null}
      </div>
    </FormStepLayout>
  );
}
