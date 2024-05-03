import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLoginHook } from "@/hooks/loginHook";
import Login from "@/custom_components/Login";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute() {
  const navigate = useNavigate();
  useLoginHook({
    redirectCallback: () => navigate({ to: "/landing" }),
    type: "success",
    withToast: false,
  });

  return <Login />;
}
