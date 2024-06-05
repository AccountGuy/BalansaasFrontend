import { partialHide } from '@/lib/string_utils'
import { Account } from '@/schemas'
import RelativeTime from '@/components/structural/RelativeTime'

const AccountCardContent = ({ name, taxServiceUser, taxServicePassword, createdAt }: Account) => {
  return (
    <>
      <div className="mb-1 block" data-testid="header">
        <span className="text-2xl font-semibold text-main-950">{name}</span>
      </div>
      <div className="flex w-full flex-col" data-testid="account-card-content">
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
    </>
  )
}

export default AccountCardContent
