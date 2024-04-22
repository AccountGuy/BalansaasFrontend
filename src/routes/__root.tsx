import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Sidebar from "../components/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <div className="min-w-full min-h-svh relative flex">
      <Sidebar />
      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
