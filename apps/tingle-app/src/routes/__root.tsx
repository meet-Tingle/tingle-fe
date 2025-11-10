import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider } from "@/provider/AuthProvider";
import { appContainer } from "./root.css";

const RootLayout = () => {
  return (
    <div className={appContainer}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
