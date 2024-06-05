import { WebSocketNotification } from '@/schemas'
import NotificationMessage from './NotificationMessage'

interface F29SummaryNotificationsProps {
  notifications: WebSocketNotification[]
}

const F29SummaryNotifications = ({ notifications }: F29SummaryNotificationsProps) => {
  const defaultMessage = (
    <div className="flex justify-between">
      <span>Click en "Generar Excel SII" para ver progreso</span>
    </div>
  )

  const lastMessageInformation = notifications.at(0)

  return (
    <>
      {notifications.length === 0 ? (
        <NotificationMessage kind="info" message={defaultMessage} />
      ) : (
        <NotificationMessage
          kind={lastMessageInformation?.kind || 'info'}
          message={lastMessageInformation?.message || 'Descargando'}
        />
      )}
    </>
  )
}

export default F29SummaryNotifications
