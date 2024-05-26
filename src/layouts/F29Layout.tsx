import Form29 from '@/custom_components/Form29'
import { getSelectAccount } from '@/handlers/accountsHandler'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useActionCableHook from '@/hooks/useActioncableHook'
import NotificationMessage from '@/custom_components/NotificationMessage'
import { WebSocketNotification } from '@/schemas'
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'

const HeaderF29Notifications = ({ totalMessages }: { totalMessages: number }) => {
  const message = (
    <div className="flex justify-between">
      <span>Click en "Generar Excel SII"</span>
      <span className="flex text-cyan-700">
        Ver Notificaciones
        <span className="ml-1.5 flex min-h-7 min-w-7 items-center justify-center rounded-full border-2 border-cyan-700 bg-cyan-50 font-semibold">
          {totalMessages}
        </span>
      </span>
    </div>
  )

  return <NotificationMessage kind="none" message={message} />
}

const F29Layout = () => {
  const [notifications, setNotifications] = useState<WebSocketNotification[]>([])
  const totalMessages = notifications.length === 0 ? 0 : notifications.length - 1

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
        <h1 className="mb-4">Formulario 29</h1>
        {isError ?? 'Error during loading'}
        {isLoading ? 'Loading' : <Form29 accounts={data!} />}
      </article>
      <article className="flex-1" data-testid="web-sockets-notifications">
        <section className="flex flex-col gap-1.5">
          <div>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger>
                  <HeaderF29Notifications totalMessages={totalMessages} />
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    {notifications.map(({ kind, message }, index) => (
                      <NotificationMessage kind={kind} message={message} key={index} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </article>
    </main>
  )
}

export default F29Layout
