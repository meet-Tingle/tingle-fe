import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Text } from "@tingle/ui";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Slogan from "@/components/slogan/Slogan";
import { customResolver } from "@/utils/zodCustomResolver";
import * as styles from "./LoginPage.css";

const loginSchema = z.object({
  userId: z
    .string()
    .min(1, "아이디를 입력해주세요")
    .min(4, "아이디는 최소 4자리 이상이어야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "아이디는 영문, 숫자, _만 사용 가능합니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(4, "비밀번호는 최소 4자리 이상이어야 합니다"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: customResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    (data: LoginFormData) => {
      console.log("Login data:", data);
      router.navigate({ to: "/profile" });
    },
    [router],
  );

  const handleBack = useCallback(() => {
    router.navigate({ to: "/" });
  }, [router]);

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
          <Input
            id="userId"
            type="text"
            placeholder="영문, 숫자, _ 사용 가능"
            size="full"
            error={!!errors.userId}
            {...register("userId")}
          />
          {errors.userId && (
            <span className={styles.errorMessage}>{errors.userId.message}</span>
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
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="primary" size="default">
            로그인
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={handleBack}
          >
            돌아가기
          </Button>
        </div>

        <div className={styles.linkText}>
          <Link to="/signin">
            <Text size="sm" weight="medium" color="primary">
              계정이 없으신가요? 회원가입
            </Text>
          </Link>
        </div>
      </form>
    </div>
  );
}
