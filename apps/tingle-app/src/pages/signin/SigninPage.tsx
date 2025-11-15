import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Spinner, Text, useToast } from "@tingle/ui";
import { Suspense, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QueryKeys } from "@/api/QueryKeyFactory";
import { register as registerApi } from "@/api/user/user.api";
import Slogan from "@/components/slogan/Slogan";
import { customResolver } from "@/utils/zodCustomResolver";
import * as styles from "./SigninPage.css";

const signinSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("유효한 이메일 주소를 입력해주세요"),
    emailChecked: z.boolean().default(false),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요")
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다")
      .regex(/[A-Z]/, "대문자를 포함해야 합니다")
      .regex(/[a-z]/, "소문자를 포함해야 합니다")
      .regex(/[0-9]/, "숫자를 포함해야 합니다")
      .regex(/[!@#$%^&*]/, "특수문자(!@#$%^&*)를 포함해야 합니다"),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <Slogan />
      <Suspense
        fallback={
          <div className={styles.loadingContainer}>
            <Spinner size="large" />
            <Text size="md" weight="medium" color="gray_600">
              회원가입 중...
            </Text>
          </div>
        }
      >
        <FormContainer />
      </Suspense>
    </div>
  );
}

const FormContainer = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    setValue,
  } = useForm<SigninFormData>({
    resolver: customResolver(signinSchema),
    mode: "onBlur",
  });

  const { mutate: signupMutate, isPending } = useMutation({
    mutationKey: QueryKeys.user.register(),
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerApi(email, password),
    onSuccess: () => {
      toast("회원가입이 완료되었습니다");
      router.navigate({ to: "/verification" });
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      toast("회원가입에 실패했습니다");
    },
  });

  const handleEmailCheck = useCallback(() => {
    const email = getValues("email");
    if (!email) {
      setError("email", {
        type: "manual",
        message: "이메일을 입력해주세요",
      });
      setValue("emailChecked", false);
      return;
    }

    // TODO: 실제 중복체크 API 호출
    const isAvailable = Math.random() > 0.5;
    if (isAvailable) {
      clearErrors("email");
      setError("email", {
        type: "success",
        message: "사용 가능한 이메일입니다",
      });
      setValue("emailChecked", true);
    } else {
      setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다",
      });
      setValue("emailChecked", false);
    }
  }, [getValues, setError, clearErrors, setValue]);

  const onSubmit = useCallback(
    (data: SigninFormData) => {
      if (!data.emailChecked) {
        setError("emailChecked", {
          type: "manual",
          message: "이메일 중복 확인을 해주세요",
        });
        return;
      }
      signupMutate({ email: data.email, password: data.password });
    },
    [signupMutate, setError],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainer}
      noValidate
    >
      <div className={styles.inputWrapper}>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <div className={styles.inputWithButton}>
          <Input
            id="email"
            type="email"
            placeholder="example@domain.com"
            size="full"
            error={!!errors.email && errors.email.type !== "success"}
            disabled={isPending}
            {...register("email", {
              onChange: () => setValue("emailChecked", false),
            })}
          />
          <Button
            type="button"
            variant="outline"
            size="fit"
            onClick={handleEmailCheck}
            disabled={isPending}
          >
            중복확인
          </Button>
        </div>
        {errors.email && (
          <span
            className={
              errors.email.type === "success"
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {errors.email.message}
          </span>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          size="full"
          error={!!errors.password}
          disabled={isPending}
          {...register("password")}
        />
        <div className={styles.passwordRules}>
          * 8자 이상, 대문자/소문자/숫자/특수문자 포함
        </div>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="passwordConfirm" className={styles.label}>
          비밀번호 확인
        </label>
        <Input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          size="full"
          error={!!errors.passwordConfirm}
          disabled={isPending}
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && (
          <span className={styles.errorMessage}>
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="default"
        disabled={isPending}
      >
        {isPending ? "가입 중..." : "회원가입"}
      </Button>

      <div className={styles.linkText}>
        <Link to="/login">
          <Text size="sm" weight="medium" color="primary">
            이미 계정이 있으신가요? 로그인
          </Text>
        </Link>
      </div>
    </form>
  );
};
