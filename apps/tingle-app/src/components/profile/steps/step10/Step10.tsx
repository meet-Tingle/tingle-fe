import { Button, Text, Textarea } from "@tingle/ui";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { errorTextStyle } from "../constants";
import * as styles from "./Step10.css";

const MAX_GENERATION = 3;

export default function Step10() {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const generatedImages = watch("generatedImages");
  const selectedImage = watch("selectedImage");
  const generationCount = watch("aiGenerationCount") ?? 0;

  const handleGenerate = async () => {
    const promptValid = await trigger("aiPrompt", { shouldFocus: true });
    if (!promptValid) {
      return;
    }

    if (generationCount >= MAX_GENERATION) {
      await trigger("aiGenerationCount");
      return;
    }

    const newCount = generationCount + 1;
    const newImages = Array.from({ length: 3 }, (_, index) => {
      return `ai-image-${newCount}-${index}-${Date.now()}`;
    });

    setValue("generatedImages", newImages, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("aiGenerationCount", newCount, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("selectedImage", "", { shouldDirty: true });
  };

  const handleSelect = (imageId: string) => {
    setValue("selectedImage", imageId, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const remaining = Math.max(0, MAX_GENERATION - generationCount);

  return (
    <section className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.fieldContainer}>
          <Text size="md" weight="medium" color="gray_600">
            프롬프트
          </Text>
          <Textarea
            rows={5}
            placeholder="예) 20대 초반, 밝은 미소, 대학생 느낌, 자연광 스튜디오..."
            error={!!errors.aiPrompt}
            {...register("aiPrompt")}
          />
          {errors.aiPrompt ? (
            <span style={errorTextStyle}>{errors.aiPrompt.message}</span>
          ) : null}
        </div>

        <div className={styles.buttonContainer}>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={remaining === 0}
          >
            {generationCount === 0
              ? "이미지 생성하기"
              : `다시 생성하기 (${remaining}회 남음)`}
          </Button>
          <Text size="sm" weight="medium" color="gray_500">
            최대 {MAX_GENERATION}회까지 생성할 수 있어요.
          </Text>
          {remaining === 0 ? (
            <span style={errorTextStyle}>
              이미지는 최대 {MAX_GENERATION}회까지만 생성할 수 있어요.
            </span>
          ) : null}
        </div>

        {generatedImages.length > 0 ? (
          <div className={styles.imageGrid}>
            {generatedImages.map((imageId) => {
              const isSelected = selectedImage === imageId;
              return (
                <button
                  key={imageId}
                  type="button"
                  onClick={() => handleSelect(imageId)}
                  className={styles.imageButton}
                  style={{
                    border: `2px solid ${isSelected ? "#0080FF" : "#D1D5DB"}`,
                    backgroundColor: isSelected ? "#E6F2FF" : "#FFFFFF",
                  }}
                >
                  <Text
                    size="sm"
                    weight="medium"
                    color={isSelected ? "blue_600" : "gray_600"}
                  >
                    {isSelected ? "선택됨" : "미리보기"}
                  </Text>
                </button>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Text size="md" weight="medium" color="gray_400">
              프롬프트를 작성하고 이미지를 생성하면 이곳에서 확인할 수 있어요.
            </Text>
          </div>
        )}
        {errors.aiGenerationCount ? (
          <span style={errorTextStyle}>{errors.aiGenerationCount.message}</span>
        ) : null}
      </div>
    </section>
  );
}
