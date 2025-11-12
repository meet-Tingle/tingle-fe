import { type ComponentType, useCallback, useMemo, useState } from "react";
import { FormProvider, type Path, useForm } from "react-hook-form";
import { z } from "zod";
import BottomContainer from "@/components/common/BottomContainer/BottomContainer";
import { ProfileFooter } from "@/components/profile/ProfileFooter";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import * as styles from "@/components/profile/steps/ProfileBofy.css";
import Step01Nickname from "@/components/profile/steps/Step01Nickname";
import Step02Birthdate from "@/components/profile/steps/Step02Birthdate";
import Step03Gender from "@/components/profile/steps/Step03Gender";
import Step04Mbti from "@/components/profile/steps/Step04Mbti";
import Step05Department from "@/components/profile/steps/Step05Department";
import Step06StudentId from "@/components/profile/steps/Step06StudentId";
import Step07KakaoId from "@/components/profile/steps/Step07KakaoId";
import Step08Interests from "@/components/profile/steps/Step08Interests";
import Step09Graduation from "@/components/profile/steps/Step09Graduation";
import Step10AiImage from "@/components/profile/steps/Step10AiImage";
import Step11Summary from "@/components/profile/steps/Step11Summary";
import type { StepComponentProps } from "@/components/profile/steps/types";
import { customResolver } from "@/utils/zodCustomResolver";

const profileFormSchema = z
  .object({
    nickname: z.string().min(2, "닉네임은 2자 이상 입력해주세요."),
    birthdate: z.string().min(1, "생년월일을 선택해주세요."),
    gender: z.enum(["male", "female"] as const),
    mbtiEI: z.enum(["E", "I"] as const),
    mbtiSN: z.enum(["S", "N"] as const),
    mbtiFT: z.enum(["F", "T"] as const),
    mbtiPJ: z.enum(["P", "J"] as const),
    department: z.string().min(1, "학과를 입력하거나 선택해주세요."),
    studentId: z
      .string()
      .regex(/^\d{4}$/, "입학연도를 4자리 숫자로 입력해주세요."),
    kakaoId: z.string().min(2, "카카오톡 ID를 2자 이상 입력해주세요."),
    interests: z.array(z.string()),
    interestsNote: z.string().optional().default(""),
    graduationStatus: z.enum(["student", "graduate"] as const),
    aiPrompt: z
      .string()
      .min(20, "AI 이미지 프롬프트를 20자 이상 입력해주세요."),
    aiGenerationCount: z
      .number()
      .min(0)
      .max(3, "이미지 생성은 최대 3회 가능합니다."),
    generatedImages: z.array(z.string()),
    selectedImage: z.string().min(1, "AI 이미지 중 하나를 선택해주세요."),
  })
  .superRefine((data, ctx) => {
    if (
      data.interests.length === 0 &&
      (!data.interestsNote || data.interestsNote.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["interests"],
        message: "관심사를 선택하거나 2자 이상 입력해주세요.",
      });
    }
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

type StepDefinition = {
  Component: ComponentType<StepComponentProps>;
  fields: Path<ProfileFormValues>[];
  title: string;
  description?: string;
};

const steps: StepDefinition[] = [
  {
    Component: Step01Nickname,
    fields: ["nickname"],
    title: "닉네임을 알려주세요",
    description: "2자 이상 입력하면 다음 단계로 이동할 수 있어요.",
  },
  {
    Component: Step02Birthdate,
    fields: ["birthdate"],
    title: "생년월일을 알려주세요",
    description: "기본 정보는 안전하게 보관돼요.",
  },
  {
    Component: Step03Gender,
    fields: ["gender"],
    title: "성별을 선택해주세요",
    description: "성별 정보는 매칭 추천에 활용돼요.",
  },
  {
    Component: Step04Mbti,
    fields: ["mbtiEI", "mbtiSN", "mbtiFT", "mbtiPJ"],
    title: "MBTI를 선택해주세요",
    description: "각 항목에서 자신과 더 가까운 성향을 고르면 돼요.",
  },
  {
    Component: Step05Department,
    fields: ["department"],
    title: "어디에서 공부하고 있나요?",
    description: "단과대와 학과 정보를 입력해주세요.",
  },
  {
    Component: Step06StudentId,
    fields: ["studentId"],
    title: "입학 연도를 알려주세요",
    description: "입학 연도는 4자리 숫자로 입력해주세요.",
  },
  {
    Component: Step07KakaoId,
    fields: ["kakaoId"],
    title: "카카오톡 ID를 입력해주세요",
    description: "상대와 연결될 카카오톡 ID를 입력해주세요.",
  },
  {
    Component: Step08Interests,
    fields: ["interests", "interestsNote"],
    title: "관심사와 취미를 알려주세요",
    description: "선호하는 활동을 선택하거나 2자 이상 직접 입력할 수 있어요.",
  },
  {
    Component: Step09Graduation,
    fields: ["graduationStatus"],
    title: "재학 여부를 알려주세요",
    description: "재학생인지, 졸업생인지 선택해주세요.",
  },
  {
    Component: Step10AiImage,
    fields: ["aiPrompt"],
    title: "AI 이미지 프롬프트를 작성해주세요",
    description: "프롬프트를 기반으로 자신을 닮은 이미지를 생성해볼 수 있어요.",
  },
  {
    Component: Step11Summary,
    fields: ["selectedImage"],
    title: "입력 내용을 확인해주세요",
    description:
      "선택한 이미지와 정보를 검토한 뒤, 대학교 인증 단계로 이동할 수 있어요.",
  },
];

const defaultValues: ProfileFormValues = {
  nickname: "",
  birthdate: "",
  gender: "male",
  mbtiEI: "E",
  mbtiSN: "S",
  mbtiFT: "F",
  mbtiPJ: "P",
  department: "",
  studentId: "",
  kakaoId: "",
  interests: [],
  interestsNote: "",
  graduationStatus: "student",
  aiPrompt: "",
  aiGenerationCount: 0,
  generatedImages: [],
  selectedImage: "",
};

export default function ProfilePage() {
  const methods = useForm<ProfileFormValues>({
    mode: "onBlur",
    defaultValues,
    resolver: customResolver(profileFormSchema),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = useCallback((data: ProfileFormValues) => {
    console.log("Profile submitted", data);
  }, []);

  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  const canProceed = Boolean(
    currentStep < totalSteps - 1 || methods.watch("selectedImage"),
  );

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNext = useCallback(async () => {
    const { fields } = steps[currentStep];
    if (fields.length > 0) {
      const isValid = await methods.trigger(fields, { shouldFocus: true });
      if (!isValid) {
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [currentStep, methods, totalSteps]);

  const currentStepInfo = useMemo(() => steps[currentStep], [currentStep]);
  const StepComponent = currentStepInfo.Component;

  return (
    <BottomContainer>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <ProfileHeader
            title={currentStepInfo.title}
            description={currentStepInfo.description}
            stepIndex={currentStep}
            totalSteps={totalSteps}
          />
          <section className={styles.profileBody}>
            <StepComponent />
          </section>
          <BottomContainer.Bottom>
            <ProfileFooter
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              canProceed={canProceed}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </BottomContainer.Bottom>
        </form>
      </FormProvider>
    </BottomContainer>
  );
}
