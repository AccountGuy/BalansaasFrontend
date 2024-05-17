import { partialHide } from '@/lib/string_utils'
import { Account } from '@/schemas'
import RelativeTime from './RelativeTime'

const AccountCard = ({ name, taxServicePassword, taxServiceUser, createdAt }: Account) => {
  return (
    <section className="balansaas-gradient min-h-28 w-60 min-w-60 flex-1 rounded-md border border-slate-500 px-4 py-1.5 shadow-md">
      <div className="mb-1 block" data-testid="header">
        <span className="text-xl font-semibold text-gray-800">{name}</span>
      </div>
      <div className="flex w-full flex-col">
        <div className="text-base" data-testid="data-container">
          <div>
            <span className="block text-sm font-medium text-gray-500">Usuario</span>
            <span className="block font-semibold text-gray-800">{taxServiceUser}</span>
          </div>
          <div className="mt-1.5">
            <span className="block text-sm font-medium text-gray-500">Contraseña</span>
            <span className="block font-semibold text-gray-800">
              {partialHide(taxServicePassword)}
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-end text-sm text-gray-500">
          <div>
            Creado <RelativeTime date={createdAt} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountCard
