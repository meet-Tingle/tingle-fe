import { Link } from "@tanstack/react-router";
import { Text } from "@tingle/ui";

export default function ProfilePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Text size="2xl" weight="bold" color="gray_600">
        Profile Page
      </Text>
      <Text size="md" weight="bold" color="gray_600">
        퍼널 구조로 된 프로필 입력 페이지
      </Text>
      <Link to="/main">
        <button type="button">
          <Text size="md" weight="bold" color="gray_600">
            main
          </Text>
        </button>
      </Link>
    </div>
  );
}
