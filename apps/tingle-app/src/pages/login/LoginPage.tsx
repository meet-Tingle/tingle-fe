import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Spinner, Text } from "@tingle/ui";
import { Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Slogan from "@/components/slogan/Slogan";
import { useAuth } from "@/provider/AuthProvider";
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
  return (
    <div className={styles.container}>
      <Slogan />
      <Suspense
        fallback={
          <div className={styles.loadingContainer}>
            <Spinner size="large" />
            <Text size="md" weight="medium" color="gray_600">
              로그인 중...
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
  const { setUser } = useAuth();
  const [loginPromise, setLoginPromise] = useState<Promise<void> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: customResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    (data: LoginFormData, e?: React.BaseSyntheticEvent) => {
      e?.preventDefault();
      const promise = new Promise<void>((resolve) =>
        setTimeout(() => {
          setUser({ id: data.userId });
          setLoginPromise(null);
          resolve();
        }, 3000),
      );
      setLoginPromise(promise);
    },
    [router, setUser],
  );

  const handleBack = useCallback(() => {
    router.navigate({ to: "/" });
  }, [router]);

  if (loginPromise) {
    throw loginPromise;
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
      }}
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
          <span className={styles.errorMessage}>{errors.password.message}</span>
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
  );
};
