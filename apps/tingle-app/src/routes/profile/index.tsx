import { ProfilePage } from "@pages/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfilePage />;
}
