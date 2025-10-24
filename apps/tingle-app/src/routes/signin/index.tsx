import { SigninPage } from "@pages/signin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SigninPage />;
}
