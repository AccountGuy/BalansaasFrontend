import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/landing')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h1>Landing page</h1>
    </div>
  )
}
