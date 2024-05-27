import Sidebar from '@/custom_components/Sidebar'
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
        <main className="overflow relative h-full w-full flex-1 flex-col px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
