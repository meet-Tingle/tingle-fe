import { useRouter } from "@tanstack/react-router";
import { Text } from "@tingle/ui";

export default function SigninPage() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Text size="2xl" weight="bold" color="gray_600">
        Signin Page
      </Text>
      <button type="button" onClick={() => router.navigate({ to: "/login" })}>
        <Text size="md" weight="bold" color="gray_600">
          Login
        </Text>
      </button>
    </div>
  );
}
