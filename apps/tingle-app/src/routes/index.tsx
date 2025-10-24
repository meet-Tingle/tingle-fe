import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@tingle/ui";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Text size="md" weight="bold" color="gray_600">
      Welcome Home!
    </Text>
  );
}
