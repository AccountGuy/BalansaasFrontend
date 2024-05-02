import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized/accounts")({
  component: () => <main>Hello /accounts!</main>,
});
