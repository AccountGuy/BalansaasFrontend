import { AuthProps } from '@/stores/authStore'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<AuthProps>()({
  component: RootHandler,
})

function RootHandler() {
  return (
    <div className="relative flex h-full min-w-full">
      <Outlet />
    </div>
  )
}
