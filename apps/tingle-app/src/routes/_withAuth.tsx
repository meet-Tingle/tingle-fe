import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/provider/AuthProvider";

export const Route = createFileRoute("/_withAuth")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
