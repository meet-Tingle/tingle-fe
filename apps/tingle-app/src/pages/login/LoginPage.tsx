import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Spinner, Text, useToast } from "@tingle/ui";
import { Suspense, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "@/api/login/login.api";
import { QueryKeys } from "@/api/QueryKeyFactory";
import Slogan from "@/components/slogan/Slogan";
import { useAuth } from "@/provider/AuthProvider";
import { customResolver } from "@/utils/zodCustomResolver";
import * as styles from "./LoginPage.css";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("유효한 이메일 주소를 입력해주세요"),
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
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: customResolver(loginSchema),
    mode: "onBlur",
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationKey: QueryKeys.login.mutation(),
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (response) => {
      setUser({ id: response.access });
      router.navigate({ to: "/profile" });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast("로그인에 실패했습니다", 2000);
    },
  });

  const onSubmit = useCallback(
    (data: LoginFormData) => {
      loginMutate({ email: data.email, password: data.password });
    },
    [loginMutate],
  );

  const handleBack = useCallback(() => {
    router.navigate({ to: "/" });
  }, [router]);

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
        <Input
          id="email"
          type="email"
          placeholder="example@domain.com"
          size="full"
          error={!!errors.email}
          disabled={isPending}
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
          disabled={isPending}
          {...register("password")}
        />
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          variant="primary"
          size="default"
          disabled={isPending}
        >
          {isPending ? "로그인 중..." : "로그인"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={handleBack}
          disabled={isPending}
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
