import { Text } from "@tingle/ui";
import tingleLogo from "@/assets/tingle.svg";
import * as styles from "./Slogan.css";

export default function Slogan() {
  return (
    <div className={styles.header}>
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
  );
}
