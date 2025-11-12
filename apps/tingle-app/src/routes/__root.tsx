// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/provider/AuthProvider";
import DesignProvider from "@/provider/DesignProvider";
import { appContainer } from "./root.css";

const RootLayout = () => {
  return (
    <DesignProvider>
      <div className={appContainer}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
    </DesignProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
