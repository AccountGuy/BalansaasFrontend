import { useLoginStore } from "@/stores/authStore";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    const { token } = useLoginStore();
    const router = useRouter();
    const navigate = useNavigate();
    if (!token) {
      router.invalidate().finally(() => navigate({ to: "/login" }));
    } else {
      navigate({ to: "/landing" });
    }
  },
});
