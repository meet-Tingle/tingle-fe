import { Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step02Birthdate({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <FormStepLayout
      title="생년월일을 알려주세요"
      description="기본 정보는 안전하게 보관돼요."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          생년월일
        </Text>
        <Input
          size="full"
          type="date"
          placeholder="YYYY-MM-DD"
          {...register("birthdate")}
        />
        {errors.birthdate ? (
          <span style={errorTextStyle}>{errors.birthdate.message}</span>
        ) : null}
      </div>
    </FormStepLayout>
  );
}
