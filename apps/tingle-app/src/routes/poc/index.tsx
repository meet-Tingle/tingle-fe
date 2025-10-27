import { createFileRoute } from "@tanstack/react-router";
import { DemoApp } from "@/poc";

export const Route = createFileRoute("/poc/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DemoApp />;
}
