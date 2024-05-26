import AccountsScreen from '@/custom_components/AccountsScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/accounts')({
  component: () => <AccountsScreen />,
})
