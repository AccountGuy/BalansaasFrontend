import { Check, X } from 'lucide-react'

interface WSNotificationProps {
  message: string
  kind: 'success' | 'error'
}

const style = {
  success: {
    border: 'border-emerald-600',
    color: 'text-emerald-600',
  },
  error: { border: 'border-red-600', color: 'text-red-600' },
} as const

const NotificationMessage = ({ message, kind }: WSNotificationProps) => {
  return (
    <section className="flex max-w-96 border border-gray-100 shadow-md">
      <div
        className={`flex w-full items-center gap-2 border-l-4 ${style[kind].border} py-4 pl-4 pr-8`}
      >
        <span className="flex-1 pl-0.5 font-medium">{message}</span>
        <span className={`${style[kind].color} ${style[kind].border} rounded-full border-2 p-1`}>
          {
            {
              success: <Check />,
              error: <X />,
            }[kind]
          }
        </span>
      </div>
    </section>
  )
}

export default NotificationMessage
