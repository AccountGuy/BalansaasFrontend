import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/landing")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1>Landing page</h1>
    </div>
  );
}
