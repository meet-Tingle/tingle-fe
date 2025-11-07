import { useRouter } from "@tanstack/react-router";
import { Button, Text } from "@tingle/ui";
import tingleLogo from "@/assets/tingle.svg";
import BottomContainer from "@/components/common/BottomContainer/BottomContainer";
import * as styles from "./LandingPage.css";

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = () => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        router.navigate({ to: "/login" });
      });
    } else {
      router.navigate({ to: "/login" });
    }
  };

  return (
    <BottomContainer>
      <div className={styles.container}>
        <div className={styles.headerGroup}>
          <img src={tingleLogo} className={styles.logo} alt="Tingle logo" />
          <div className={styles.textContainer}>
            <Text as="h1" size="2xl" weight="bold" color="gray_700">
              TINGLE
            </Text>
            <Text size="md" weight="medium" color="gray_500">
              대학생 소속 인증 기반 매칭 플랫폼
            </Text>
          </div>
        </div>
      </div>

      <BottomContainer.Bottom>
        <Button variant="primary" size="default" onClick={handleLogin}>
          인연 만들러 가기
        </Button>
      </BottomContainer.Bottom>
    </BottomContainer>
  );
}
