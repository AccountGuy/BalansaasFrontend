import Sidebar from '@/components/structural/Sidebar'
import { useLoginHook } from '@/hooks/loginHook'
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized')({
  component: AuthLayout,
})

function AuthLayout() {
  const navigate = useNavigate()

  useLoginHook({
    redirectCallback: () => navigate({ to: '/login' }),
    type: 'failure',
  })

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <div role="presentation" className="relative flex h-full w-full max-w-full overflow-auto">
        <main className="main-container relative h-full w-full flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
