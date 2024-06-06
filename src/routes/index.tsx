import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useLoginHook } from '@/hooks/loginHook'
import Login from '@/components/structural/Login'

export const Route = createFileRoute('/')({
  component: IndexRoute,
})

function IndexRoute() {
  const navigate = useNavigate()
  useLoginHook({
    redirectCallback: () => navigate({ to: '/landing' }),
    type: 'success',
  })

  return <Login />
}
