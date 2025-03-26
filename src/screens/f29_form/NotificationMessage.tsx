import { WebSocketNotification } from '@/schemas'
import { Check, LoaderCircle, X } from 'lucide-react'
import NormalInfo from '@/components/icons/NormalInfo'
import { Progress } from '@/components/ui/progress'

const style = {
  success: {
    border: 'border-emerald-600',
    color: 'text-emerald-600',
    bg: 'bg-emerald-600',
  },
  error: { border: 'border-red-600', color: 'text-red-600', bg: 'bg-red-600' },
  info: { border: 'border-sky-600', color: 'text-sky-600', bg: 'bg-sky-600' },
  none: { border: 'border-cyan-600', color: 'text-cyan-600', bg: 'bg-cyan-600' },
} as const

const NotificationMessage = ({ message, kind, progress }: WebSocketNotification) => {
  const iconSelected =
    {
      success: <Check />,
      error: <X />,
      info: <LoaderCircle className="animate-spin" />,
      none: <NormalInfo />,
    }[kind] ?? null

  return (
    <section className="flex w-full border border-gray-100 shadow-md">
      <div className={`flex w-full flex-col border-l-4 ${style[kind].border} py-4 pl-4 pr-8`}>
        <div className={`flex w-full items-center justify-between gap-2`}>
          <div className="flex-1 pl-0.5 text-left font-medium">{message}</div>
          {iconSelected ? (
            <span
              className={`${style[kind].color} ${kind === 'info' ? 'border-transparent' : style[kind].border} rounded-full border-2 p-1`}
            >
              {iconSelected}
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex items-center justify-center">
          {progress ? <Progress value={progress * 100} indicatorColor={style[kind].bg} /> : ''}
        </div>
      </div>
    </section>
  )
}

export default NotificationMessage
