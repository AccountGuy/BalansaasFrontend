import Login from '@/components/structural/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: () => <Login />,
})
