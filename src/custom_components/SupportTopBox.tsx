import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BoldLogo } from '@/components/icons'
import { Ticket, ClipboardPlus } from 'lucide-react'

const SupportTopBox = () => {
  return (
    <section className="relative flex min-h-52 w-full divide-x rounded-md p-5 shadow-custom">
      <div className="flex-1 place-items-center">
        <article className="grid place-items-center gap-y-3 py-8">
          <div className="align-center flex items-center text-2xl font-semibold text-main-800">
            <span className="align-center">¿Problemas con</span>
            <div className="mx-2 flex max-h-6 max-w-24">
              <BoldLogo />
            </div>
            ?
          </div>
          <button className="btn-big items-end bg-main-900 shadow-md">
            Pedir soporte
            <span className="mb-[1px]">
              <Ticket size="28" />
            </span>
          </button>
        </article>
      </div>

      <div className="flex-1 place-items-center">
        <article className="grid place-items-center gap-y-3 py-8">
          <div className="align-center flex items-center text-2xl font-semibold text-emerald-700">
            <span className="align-center">¿Deseas una nueva funcionalidad?</span>
          </div>
          <button className="btn-big items-end bg-emerald-700 shadow-md">
            Sugerir mejora
            <span className="mb-[1px]">
              <ClipboardPlus size="28" />
            </span>
          </button>
        </article>
      </div>
    </section>
  )
}

export default SupportTopBox
