import { getSelectAccount } from '@/handlers/accountsHandler'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { WebSocketNotification } from '@/schemas'
import F29SummaryNotifications from './F29SummaryNotifications'
import Form29 from '@/screens/f29_form/Form29'
import Loader from '@/components/loaders/Loader'
import useActionCableHook from '@/hooks/useActioncableHook'

const F29Layout = () => {
  const [notifications, setNotifications] = useState<WebSocketNotification[]>([])

  const { data, isLoading, isError } = useQuery({
    queryFn: getSelectAccount,
    queryKey: ['account-select'],
  })

  const handleReceivedMessage = (message: any) => {
    setNotifications([message, ...notifications])
  }

  useActionCableHook('NotificationChannel', handleReceivedMessage)

  return (
    <main className="flex flex-row flex-wrap gap-12">
      <article className="flex flex-1 flex-col">
        <section>
          <div>
            <h1 className="mb-4">Formulario 29</h1>
          </div>
          {isError ?? 'Error during loading'}
          {isLoading ? (
            <Loader size="lg" label="Cargando Formulario" className="min-h-80" />
          ) : (
            <Form29 accounts={data!} />
          )}
        </section>

        <section className="mt-6">
          <F29SummaryNotifications notifications={notifications} />
        </section>
      </article>
      <article className="flex-1" data-testid="web-sockets-notifications">
        <section className="flex flex-col gap-1.5"></section>
      </article>
    </main>
  )
}

export default F29Layout
