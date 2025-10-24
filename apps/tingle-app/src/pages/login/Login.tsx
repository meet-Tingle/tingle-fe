import { Link, useRouter } from "@tanstack/react-router";
import { Text } from "@tingle/ui";

export default function Login() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Text size="2xl" weight="bold" color="gray_600">
        Login Page
      </Text>
      <Link to="/signin">
        <Text size="md" weight="bold" color="gray_600">
          Signin
        </Text>
      </Link>
      <button type="button" onClick={() => router.navigate({ to: "/" })}>
        <Text size="md" weight="bold" color="gray_600">
          Back
        </Text>
      </button>
    </div>
  );
}
