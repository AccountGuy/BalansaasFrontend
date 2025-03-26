import F29Layout from '@/screens/f29_form/F29Layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/form-29')({
  component: () => <F29Layout />,
})
