import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_withAuth")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
