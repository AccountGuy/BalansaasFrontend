import { partialHide } from '@/lib/string_utils'
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import type { Account } from '@/schemas'
import RelativeTime from './RelativeTime'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const AccountCard = ({ name, taxServicePassword, taxServiceUser, createdAt }: Account) => {
  return (
    <section className="balansaas-gradient relative min-h-28 min-w-80 flex-1 rounded-md p-5 shadow-md">
      <Popover>
        <PopoverTrigger asChild>
          <div className="absolute right-5 top-5 rounded-sm text-main-900 hover:bg-main-200/50">
            <EllipsisVertical />
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-36 space-y-1 border py-1">
          <div className="flex justify-between px-4 py-1.5 text-gray-700 hover:bg-gray-100">
            Editar <SquarePen />
          </div>
          <div className="my-4 h-[1px] w-full shrink-0 bg-border"></div>
          <div className="flex justify-between px-4 py-1.5 text-red-700 hover:bg-red-50">
            Eliminar <Trash2 />
          </div>
        </PopoverContent>
      </Popover>
      <div className="mb-1 block" data-testid="header">
        <span className="text-2xl font-semibold text-main-950">{name}</span>
      </div>
      <div className="flex w-full flex-col">
        <div className="text-base" data-testid="data-container">
          <div>
            <span className="block text-sm font-semibold text-main-950">Usuario</span>
            <span className="block font-semibold text-main-950">{taxServiceUser}</span>
          </div>
          <div className="mt-1.5">
            <span className="block text-sm font-semibold text-main-950">Contraseña</span>
            <span className="block font-semibold text-main-950">
              {partialHide(taxServicePassword)}
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-end text-sm font-semibold text-main-700">
          <div>
            Creado <RelativeTime date={createdAt} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountCard
