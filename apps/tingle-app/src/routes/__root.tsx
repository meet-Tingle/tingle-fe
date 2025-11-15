// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/provider/AuthProvider";
import DesignProvider from "@/provider/DesignProvider";
import { appContainer } from "./root.css";

const RootLayout = () => {
  return (
    <DesignProvider>
      <QueryClientProvider client={new QueryClient()}>
        <div className={appContainer}>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </DesignProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
