import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/main/MainPage";

export const Route = createFileRoute("/_withAuth/_withProfile/main/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}
