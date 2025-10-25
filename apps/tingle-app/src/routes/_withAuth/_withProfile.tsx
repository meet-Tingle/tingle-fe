import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProfileProvider } from "@/provider/ProfileProvider";

export const Route = createFileRoute("/_withAuth/_withProfile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  );
}
