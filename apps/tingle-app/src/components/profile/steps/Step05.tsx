import { Button, Input, Text } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "./constants";
import * as styles from "./FormStepLayout.css";

export default function Step05() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const handleMockBottomSheet = () => {
    // TODO: bottom sheet 연결 시 업데이트
    setValue("department", "경영대학 / 경영학과", {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <section className={styles.content}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Text size="md" weight="medium" color="gray_600">
          학과
        </Text>
        <Input
          size="full"
          placeholder="예) 공과대학 / 컴퓨터공학과"
          {...register("department")}
        />
        {errors.department ? (
          <span style={errorTextStyle}>{errors.department.message}</span>
        ) : null}
        <Button type="button" variant="ghost" onClick={handleMockBottomSheet}>
          학과 선택하기 (임시)
        </Button>
        <Text size="sm" weight="medium" color="gray_500">
          * 실제 서비스에서는 바텀시트에서 학과를 선택할 수 있어요.
        </Text>
      </div>
    </section>
  );
}
