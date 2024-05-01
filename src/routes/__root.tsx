import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import { useLoginStore } from "../stores/authStore";

export const Route = createRootRoute({
  component: RootHandler,
});

function RootHandler() {
  const { token: isAuthenticated } = useLoginStore();
  console.log(isAuthenticated);

  if (!isAuthenticated) return <Login />;
  return (
    <div className="min-w-full min-h-svh relative flex">
      <Sidebar />
      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
