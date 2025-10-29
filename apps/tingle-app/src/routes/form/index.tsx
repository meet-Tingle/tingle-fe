import { createFileRoute } from "@tanstack/react-router";
import { FormPage } from "@/pages/form";

export const Route = createFileRoute("/form/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormPage />;
}
