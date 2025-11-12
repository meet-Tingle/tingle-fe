import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step01Nickname({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <FormStepLayout
      title="닉네임을 알려주세요"
      description="2자 이상 입력하면 다음 단계로 이동할 수 있어요."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          닉네임
        </Text>
        <Input
          size="full"
          placeholder="예) tingle_lover"
          {...register("nickname")}
        />
        {errors.nickname ? (
          <span style={errorTextStyle}>{errors.nickname.message}</span>
        ) : null}
      </div>
    </FormStepLayout>
  );
}
