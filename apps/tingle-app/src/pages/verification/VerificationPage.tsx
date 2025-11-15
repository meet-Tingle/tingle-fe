import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button, Input, useToast } from "@tingle/ui";
import { atom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QueryKeys } from "@/api/QueryKeyFactory";
import { sendCode, verifyCode } from "@/api/user/user.api";
import { customResolver } from "@/utils/zodCustomResolver";
import * as styles from "./VerificationPage.css";

export const verificationEmailAtom = atom<string>("");

const verificationSchema = z.object({
  code: z
    .string()
    .min(1, "인증 코드를 입력해주세요")
    .length(6, "인증 코드는 6자리입니다"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function VerificationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [hasSentCode, setHasSentCode] = useState(false);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const verificationEmail = useAtomValue(verificationEmailAtom);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<VerificationFormData>({
    resolver: customResolver(verificationSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!verificationEmail) {
      toast("이메일 정보가 없습니다");
      router.navigate({ to: "/" });
    }
  }, [router, verificationEmail]);

  const { mutate: sendCodeMutate, isPending: isSendingCode } = useMutation({
    mutationKey: QueryKeys.user.sendCode(),
    mutationFn: (email: string) => sendCode(email),
    onSuccess: (response) => {
      setExpiresIn(response.expires_in);
      toast(response.message);
    },
    onError: () => {
      toast("인증 코드 발송에 실패했습니다");
    },
  });

  const { mutate: verifyCodeMutate, isPending: isVerifying } = useMutation({
    mutationKey: QueryKeys.user.verifyCode(),
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyCode(email, code),
    onSuccess: () => {
      router.navigate({ to: "/login" });
    },
    onError: () => {
      toast("인증에 실패했습니다. 코드를 다시 확인해주세요");
    },
  });

  const handleVerify = useCallback(
    (data: VerificationFormData) => {
      verifyCodeMutate({ email: verificationEmail, code: data.code });
    },
    [verificationEmail, verifyCodeMutate, toast],
  );

  const handleResend = useCallback(() => {
    sendCodeMutate(verificationEmail);
    reset();
  }, [verificationEmail, sendCodeMutate, reset, toast]);

  const handleBack = useCallback(() => {
    router.navigate({ to: "/" });
  }, [router]);

  const handleVerifyClick = useCallback(() => {
    verifyCodeMutate({ email: verificationEmail, code: getValues("code") });
  }, [verificationEmail, verifyCodeMutate]);

  const handleSendCodeClick = useCallback(() => {
    setHasSentCode(true);
    sendCodeMutate(verificationEmail);
  }, [verificationEmail, sendCodeMutate]);

  const handleButtonClick = useCallback(() => {
    if (hasSentCode) {
      handleVerifyClick();
    } else {
      handleSendCodeClick();
    }
  }, [hasSentCode, handleVerifyClick, handleSendCodeClick]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>이메일 인증</h1>
          <p className={styles.description}>
            {`가입하신 이메일로 인증 코드를 발송해 \n회원 인증을 완료해주세요.`}
          </p>
        </div>

        {verificationEmail && (
          <div className={styles.emailInfo}>{verificationEmail}</div>
        )}

        <form
          onSubmit={handleSubmit(handleVerify)}
          className={styles.formSection}
          noValidate
        >
          {hasSentCode && (
            <div className={styles.inputWrapper}>
              <label htmlFor="code" className={styles.label}>
                인증 코드
              </label>

              <div className={styles.inputContainer}>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  error={!!errors.code}
                  disabled={isVerifying}
                  {...register("code")}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="fit"
                  onClick={handleResend}
                  disabled={isSendingCode || isVerifying}
                  className={styles.resendButton}
                >
                  재발송
                </Button>
              </div>
              {expiresIn && <TimeLeft expiresIn={expiresIn} />}
              {errors.code && (
                <span className={styles.errorMessage}>
                  {errors.code.message}
                </span>
              )}
            </div>
          )}
          <div className={styles.buttonGroup}>
            <Button
              type={hasSentCode ? "submit" : "button"}
              variant="primary"
              size="default"
              disabled={isVerifying || isSendingCode}
              onClick={handleButtonClick}
            >
              {isVerifying
                ? "인증 중..."
                : hasSentCode
                  ? "인증 완료"
                  : "인증 코드 발송"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="default"
              onClick={handleBack}
              disabled={isVerifying || isSendingCode}
            >
              돌아가기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const TimeLeft = ({ expiresIn }: { expiresIn: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(expiresIn);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const isExpired = timeLeft <= 0;

  return (
    <div
      className={`${styles.timerText} ${isExpired ? styles.timerExpired : ""}`}
    >
      {isExpired
        ? "인증 코드가 만료되었습니다"
        : `${formatTime(timeLeft)}초 남음`}
    </div>
  );
};
