import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ToastProvider } from "@tingle/ui";
import { AuthProvider } from "@/provider/AuthProvider";
import { appContainer } from "./root.css";

const RootLayout = () => {
  return (
    <ToastProvider>
      <div className={appContainer}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
    </ToastProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
