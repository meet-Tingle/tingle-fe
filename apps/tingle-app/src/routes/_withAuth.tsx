import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Spinner, Text } from "@tingle/ui";
import { Suspense } from "react";
import { AuthProvider } from "@/provider/AuthProvider";
import * as styles from "./root.css";

export const Route = createFileRoute("/_withAuth")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <Suspense
      fallback={
        <div className={styles.loadingContainer}>
          <Spinner size="large" />
          <Text size="md" weight="medium" color="gray_600">
            권한 확인하는 중
          </Text>
        </div>
      }
    >
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </Suspense>
  );
}
