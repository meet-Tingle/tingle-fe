import { Link, useRouter } from "@tanstack/react-router";
import { Button, Input, Text } from "@tingle/ui";
import type { ChangeEvent } from "react";
import { useState } from "react";
import tingleLogo from "@/assets/tingle.svg";
import * as styles from "./LoginPage.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.navigate({ to: "/profile" });
  };

  const handleBack = () => {
    router.navigate({ to: "/" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={tingleLogo} className={styles.logo} alt="Tingle logo" />
        <div className={styles.textContainer}>
          <Text as="h1" size="4xl" weight="bold" color="gray_700">
            TINGLE
          </Text>
          <Text size="md" weight="medium" color="gray_500">
            대학생 소속 인증 기반 매칭 플랫폼
          </Text>
        </div>
      </div>

      <form onSubmit={handleLogin} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            size="full"
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            size="full"
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            type="submit"
            variant="primary"
            size="default"
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button variant="ghost" size="default" onClick={handleBack}>
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
