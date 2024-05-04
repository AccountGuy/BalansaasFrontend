import { AuthProps } from "@/stores/authStore";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<AuthProps>()({
  component: RootHandler,
});

function RootHandler() {
  return (
    <div className="min-w-full min-h-svh relative flex">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
