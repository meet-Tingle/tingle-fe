import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Text } from "@tingle/ui";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Slogan from "@/components/slogan/Slogan";
import { customResolver } from "@/utils/zodCustomResolver";
import * as styles from "./SigninPage.css";

const signinSchema = z
  .object({
    userId: z
      .string()
      .min(1, "아이디를 입력해주세요")
      .min(4, "아이디는 최소 4자리 이상이어야 합니다")
      .regex(/^[a-zA-Z0-9_]+$/, "아이디는 영문, 숫자, _만 사용 가능합니다"),
    idChecked: z.boolean().default(false),
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
  const router = useRouter();

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

  const handleIdCheck = useCallback(() => {
    const userId = getValues("userId");
    if (!userId || userId.length < 4) {
      setError("userId", {
        type: "manual",
        message: "아이디를 4자 이상 입력해주세요",
      });
      setValue("idChecked", false);
      return;
    }

    // TODO: 실제 중복체크 API 호출
    const isAvailable = Math.random() > 0.5;
    if (isAvailable) {
      clearErrors("userId");
      setError("userId", {
        type: "success",
        message: "사용 가능한 아이디입니다",
      });
      setValue("idChecked", true);
    } else {
      setError("userId", {
        type: "manual",
        message: "이미 사용 중인 아이디입니다",
      });
      setValue("idChecked", false);
    }
  }, [getValues, setError, clearErrors, setValue]);

  const onSubmit = useCallback(
    (data: SigninFormData) => {
      if (!data.idChecked) {
        alert("아이디 중복 확인을 해주세요");
        return;
      }
      router.navigate({ to: "/login" });
    },
    [router],
  );

  return (
    <div className={styles.container}>
      <Slogan />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formContainer}
        noValidate
      >
        <div className={styles.inputWrapper}>
          <label htmlFor="userId" className={styles.label}>
            아이디
          </label>
          <div className={styles.inputWithButton}>
            <Input
              id="userId"
              type="text"
              placeholder="영문, 숫자, _ 사용 가능"
              size="full"
              error={!!errors.userId && errors.userId.type !== "success"}
              {...register("userId", {
                onChange: () => setValue("idChecked", false),
              })}
            />
            <Button
              type="button"
              variant="outline"
              size="fit"
              onClick={handleIdCheck}
            >
              중복확인
            </Button>
          </div>
          {errors.userId && (
            <span
              className={
                errors.userId.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {errors.userId.message}
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
            {...register("password")}
          />
          <div className={styles.passwordRules}>
            * 8자 이상, 대문자/소문자/숫자/특수문자 포함
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
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
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <span className={styles.errorMessage}>
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>

        <Button type="submit" variant="primary" size="default">
          회원가입
        </Button>

        <div className={styles.linkText}>
          <Link to="/login">
            <Text size="sm" weight="medium" color="primary">
              이미 계정이 있으신가요? 로그인
            </Text>
          </Link>
        </div>
      </form>
    </div>
  );
}
