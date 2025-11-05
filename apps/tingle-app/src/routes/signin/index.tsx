import { createFileRoute } from "@tanstack/react-router";
import SigninPage from "@/pages/signin/SigninPage";

export const Route = createFileRoute("/signin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SigninPage />;
}
