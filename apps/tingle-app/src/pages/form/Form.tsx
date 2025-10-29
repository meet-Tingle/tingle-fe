import { createParser } from "@tingle/parser";
import { Text } from "@tingle/ui";

export default function Form() {
  return (
    <Text size="2xl" weight="bold" color="gray_600">
      {createParser()}
    </Text>
  );
}
