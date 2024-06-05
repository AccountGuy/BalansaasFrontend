import AccountsScreen from '@/screens/accounts/AccountsScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/accounts')({
  component: () => <AccountsScreen />,
})
