import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@tingle/ui";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <Text size="md" weight="bold" color="gray_600">
      About
    </Text>
  );
}
