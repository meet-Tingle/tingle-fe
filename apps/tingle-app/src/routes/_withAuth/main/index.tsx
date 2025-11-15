import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/main/MainPage";

export const Route = createFileRoute("/_withAuth/main/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}
