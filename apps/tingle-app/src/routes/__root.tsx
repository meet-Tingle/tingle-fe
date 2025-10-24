import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Text } from "@tingle/ui";
import tingleLogo from "../assets/tingle.svg";
import PWABadge from "../PWABadge";

const RootLayout = () => (
  <>
    <div>
      <img src={tingleLogo} className="logo tingle" alt="Tingle logo" />
    </div>
    <Text as="h1" size="2xl" weight="bold" color="primary">
      TINGLE
    </Text>
    <Text size="md" weight="bold" color="gray_600">
      Tingle is a matching platform based on university student verification for
      university students to find and connect with other students.
    </Text>
    <br />
    <Text size="sm" weight="regular" color="gray_400">
      Built with React + Vite + PWA
    </Text>
    <PWABadge />

    <div style={{ display: "flex", gap: "10px" }}>
      <Link to="/">
        <Text size="md" weight="bold" color="gray_600">
          Tingle
        </Text>
      </Link>
      <Link to="/about">
        <Text size="md" weight="bold" color="gray_600">
          About
        </Text>
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
