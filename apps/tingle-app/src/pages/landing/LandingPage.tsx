import { useRouter } from "@tanstack/react-router";
import { Button } from "@tingle/ui";
import BottomContainer from "@/components/common/BottomContainer/BottomContainer";
import Slogan from "@/components/slogan/Slogan";
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
        <Slogan />
      </div>

      <BottomContainer.Bottom>
        <Button variant="primary" size="default" onClick={handleLogin}>
          인연 만들러 가기
        </Button>
      </BottomContainer.Bottom>
    </BottomContainer>
  );
}
