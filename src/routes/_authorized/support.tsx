import SupportLayout from '@/screens/support/SupportLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/support')({
  component: () => <SupportLayout />,
})
