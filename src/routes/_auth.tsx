import Sidebar from "@/custom_components/Sidebar";
import { useLoginStore } from "@/stores/authStore";
import {
  Outlet,
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => {
    const { token } = useLoginStore();
    const router = useRouter();
    const navigate = useNavigate();
    if (!token) {
      router.invalidate().finally(() => navigate({ to: "/login" }));
    }
    return (
      <>
        <Sidebar />
        <main className="flex-1 px-6 py-4">
          <Outlet />
        </main>
      </>
    );
  },
});
