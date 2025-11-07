import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Text } from "@tingle/ui";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Slogan from "@/components/slogan/Slogan";
import { customResolver } from "@/utils/zodCustomResolver";
import * as styles from "./LoginPage.css";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
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
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            size="full"
            error={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
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
