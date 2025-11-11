import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Spinner, Text } from "@tingle/ui";
import { Suspense } from "react";
import Slogan from "@/components/slogan/Slogan";
import { ProfileProvider } from "@/provider/ProfileProvider";
import * as styles from "./_withProfile.css";

export const Route = createFileRoute("/_withAuth/_withProfile")({
  component: ProfileLayout,
});

function LoadingFallback() {
  return (
    <div className={styles.loadingContainer}>
      <Slogan />
      <Spinner size="large" />
      <Text size="md" weight="medium" color="gray_600">
        프로필 불러오는 중...
      </Text>
    </div>
  );
}

function ProfileLayout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProfileProvider>
        <Outlet />
      </ProfileProvider>
    </Suspense>
  );
}
