import Form29 from '@/custom_components/Form29'
import { getSelectAccount } from '@/handlers/accountsHandler'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useActionCableHook from '@/hooks/useActioncableHook'

const F29Layout = () => {
  const [notifications, setNotifications] = useState<any>([])
  const { data, isLoading, isError } = useQuery({
    queryFn: getSelectAccount,
    queryKey: ['account-select'],
  })

  const handleReceivedMessage = (message: any) => {
    console.log('Message', message)
    setNotifications([...notifications, message])
  }

  useActionCableHook('NotificationChannel', handleReceivedMessage)
  console.log(notifications)

  return (
    <main className="flex flex-row flex-wrap gap-5">
      <article className="flex flex-1 flex-col">
        <h1 className="mb-4">Formulario 29</h1>
        {isError ?? 'Error during loading'}
        {isLoading ? 'Loading' : <Form29 accounts={data!} />}
      </article>
      <article className="flex-1" data-testid="previewData">
        <section>
          {notifications.map((notification: any) => (
            <div>{notification.message}</div>
          ))}
        </section>
      </article>
    </main>
  )
}

export default F29Layout
