import Sidebar from "@/custom_components/Sidebar";
import { useLoginHook } from "@/hooks/loginHook";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized")({
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  useLoginHook(() => navigate({ to: "/login" }));

  return (
    <>
      <Sidebar />
      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>
    </>
  );
}
