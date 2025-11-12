import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "@/pages/profile/ProfilePage";

export const Route = createFileRoute("/_withAuth/_withProfile/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfilePage />;
}
