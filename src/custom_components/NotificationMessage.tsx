import NormalInfo from '@/components/icons/NormalInfo'
import { WebSocketNotification } from '@/schemas'
import { Check, X } from 'lucide-react'

const style = {
  success: {
    border: 'border-emerald-600',
    color: 'text-emerald-600',
  },
  error: { border: 'border-red-600', color: 'text-red-600' },
  info: { border: 'border-sky-600', color: 'text-sky-600' },
  none: { border: 'border-cyan-600', color: 'text-cyan-600' },
} as const

const NotificationMessage = ({ message, kind }: WebSocketNotification) => {
  const iconSelected =
    {
      success: <Check />,
      error: <X />,
      info: <NormalInfo />,
      none: null,
    }[kind] ?? null

  return (
    <section className="flex w-full border border-gray-100 shadow-md">
      <div
        className={`flex w-full items-center justify-between gap-2 border-l-4 ${style[kind].border} py-4 pl-4 pr-8`}
      >
        <div className="flex-1 pl-0.5 text-left font-medium">{message}</div>
        {iconSelected ? (
          <span className={`${style[kind].color} ${style[kind].border} rounded-full border-2 p-1`}>
            {iconSelected}
          </span>
        ) : null}
      </div>
    </section>
  )
}

export default NotificationMessage
