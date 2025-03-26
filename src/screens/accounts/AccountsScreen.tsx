import { getAllAccounts } from '@/handlers/accountsHandler'
import { useQuery } from '@tanstack/react-query'
import AccountCard from './AccountCard'
import AccountsHeader from './AccountsHeader'

const AccountsScreen = () => {
  const {
    data: accounts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAllAccounts,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isError) {
    return <article> No se pudo cargar esta página</article>
  }

  if (isLoading) {
    return (
      <article className="text-xl">
        <h1>Cuentas SII</h1>
      </article>
    )
  }

  if (accounts === undefined) {
    return <article> Necesitas registrar una cuenta del SII </article>
  }

  return (
    <>
      <article className="text-xl">
        <AccountsHeader />
      </article>
      {accounts.length === 0 ? (
        <div>Añadir cuenta nueva</div>
      ) : (
        <article
          className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 py-4"
          data-testid="cards-section"
        >
          {accounts.map((account) => (
            <AccountCard {...account} key={account.id} />
          ))}
        </article>
      )}
    </>
  )
}

export default AccountsScreen
