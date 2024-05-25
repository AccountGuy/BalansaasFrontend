import SupportLayout from '@/layouts/SupportLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/support')({
  component: () => <SupportLayout />,
})
