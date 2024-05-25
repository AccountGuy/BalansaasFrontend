import { getAllReleases } from '@/handlers/releasesHandler'
import { useQuery } from '@tanstack/react-query'
import AccountCard from './AccountCard'
import AccountsHeader from './AccountsHeader'

const AccountsScreen = () => {
  const {
    data: releases,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAllReleases,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isError) {
    return <article> No se pudo cargar esta página</article>
  }

  if (isLoading) {
    return (
      <article className="text-xl">
        <h1>Soporte</h1>
      </article>
    )
  }

  if (releases === undefined) {
    return <article> No existen releases </article>
  }

  return (
    <>
      <article className="text-xl">lol</article>
      {releases.length === 0 ? <div>No hay releases</div> : releases.map((release) => 1)}
    </>
  )
}

export default AccountsScreen
