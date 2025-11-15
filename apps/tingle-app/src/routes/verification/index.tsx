import { createFileRoute } from "@tanstack/react-router";
import VerificationPage from "@/pages/verification/VerificationPage";

export const Route = createFileRoute("/verification/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <VerificationPage />;
}
