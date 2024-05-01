import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/accounts")({
  component: () => <main>Hello /accounts!</main>,
});
