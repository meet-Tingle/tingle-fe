import { MainPage } from "@pages/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_withAuth/_withProfile/main/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}
