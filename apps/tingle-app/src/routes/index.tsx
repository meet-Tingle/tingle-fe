import { createFileRoute, Link } from "@tanstack/react-router";
import { Text } from "@tingle/ui";
import tingleLogo from "../assets/tingle.svg";
import PWABadge from "../PWABadge";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div>
        <img src={tingleLogo} className="logo tingle" alt="Tingle logo" />
      </div>
      <Text as="h1" size="2xl" weight="bold" color="primary">
        TINGLE
      </Text>
      <Text size="md" weight="bold" color="gray_600">
        Tingle is a matching platform based on university student verification
        for university students to find and connect with other students.
      </Text>
      <br />
      <Text size="sm" weight="regular" color="gray_400">
        Built with React + Vite + PWA
      </Text>
      <PWABadge />

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/login">
          <Text size="md" weight="bold" color="gray_600">
            Login
          </Text>
        </Link>
        <Link to="/form">
          <Text size="md" weight="bold" color="gray_600">
            Form
          </Text>
        </Link>
      </div>
    </>
  );
}
