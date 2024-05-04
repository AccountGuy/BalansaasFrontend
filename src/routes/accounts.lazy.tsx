import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/accounts")({
  component: () => <main>Hello /accounts!</main>,
});
