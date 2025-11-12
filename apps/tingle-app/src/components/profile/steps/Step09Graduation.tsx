import { Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import FormStepLayout from "./FormStepLayout";
import type { StepComponentProps } from "./types";

export default function Step09Graduation({
  stepIndex,
  totalSteps,
}: StepComponentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <FormStepLayout
      title="재학 여부를 알려주세요"
      description="재학생인지, 졸업생인지 선택해주세요."
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
          <input
            type="radio"
            value="student"
            {...register("graduationStatus")}
          />
          <Text size="md" weight="medium" color="gray_700">
            재학생
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
          <input
            type="radio"
            value="graduate"
            {...register("graduationStatus")}
          />
          <Text size="md" weight="medium" color="gray_700">
            졸업생
          </Text>
        </label>
        {errors.graduationStatus ? (
          <span style={errorTextStyle}>{errors.graduationStatus.message}</span>
        ) : null}
      </div>
    </FormStepLayout>
  );
}
