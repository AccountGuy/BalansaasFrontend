import { useState } from 'react'
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import type { Account } from '@/schemas'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AccountFormProps, AccountSchema } from '@/schemas/forms'
import { toast } from '@/components/ui/use-toast'
import AccountCardContent from './AccountCardContent'
import {
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from '@/tanstack_hooks/accounts_queries'
import { zodResolver } from '@hookform/resolvers/zod'

const AccountCard = ({ id, name, taxServicePassword, taxServiceUser, createdAt }: Account) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormProps>({
    defaultValues: {
      name,
      tax_service_user: taxServicePassword,
      tax_service_password: taxServicePassword,
    },
    resolver: zodResolver(AccountSchema),
  })
  const { mutateAsync: mutateUpdateAccount, isPending, isError } = useUpdateAccountMutation()
  const { mutateAsync: mutateDeleteAccount } = useDeleteAccountMutation()

  const handleUpdateAccount: SubmitHandler<AccountFormProps> = async (data) => {
    const accountResponse = await mutateUpdateAccount({ ...data, id: id.toString() })
    if (isError) {
      toast({
        variant: 'destructive',
        title: `Problem with the creation`,
      })
    } else {
      toast({
        variant: 'success',
        title: `Cuenta "${accountResponse.name}" actualizada!`,
      })
      setIsModalOpen(false)
    }
  }

  const handleDeleteAccount = async () => {
    const accountResponse = await mutateDeleteAccount(id.toString())
    if (isError) {
      toast({
        variant: 'destructive',
        title: `Problem with the deletion`,
      })
    } else {
      toast({
        variant: 'success',
        title: `Cuenta "${accountResponse.name}" eliminada!`,
      })
      setIsModalOpen(false)
    }
  }
  return (
    <section className="balansaas-gradient relative min-h-28 min-w-80 max-w-96 flex-1 rounded-md p-5 shadow-md">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Popover>
          <PopoverTrigger asChild>
            <button className="absolute right-5 top-5 rounded-sm text-main-900 hover:bg-main-200/50">
              <EllipsisVertical />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-36 space-y-1 border py-1">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger className="w-full" asChild>
                <button className="flex w-full justify-between bg-white px-4 py-1.5 text-gray-700 hover:bg-gray-100">
                  Editar
                  <SquarePen />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Actualiza la cuenta <span className="text-gradient">"{name}"</span>
                  </DialogTitle>
                </DialogHeader>
                <section className="mt-3">
                  <form onSubmit={handleSubmit(handleUpdateAccount)}>
                    <div className="form-field">
                      <label className="label-field">Nombre descriptivo</label>
                      <input {...register('name')} className="input-field" />
                    </div>
                    <div className="form-field">
                      <label className="label-field">Usuario SII</label>
                      <input {...register('tax_service_user')} className="input-field" />
                      <div className="text-sm text-red-500">{errors.tax_service_user?.message}</div>
                    </div>
                    <div className="form-field">
                      <label className="label-field">Contraseña SII</label>
                      <input {...register('tax_service_password')} className="input-field" />
                    </div>
                    <button type="submit" className="btn w-full font-semibold" disabled={isPending}>
                      {isPending ? 'Actualizando' : 'Actualizar Cuenta'}
                    </button>
                  </form>
                </section>
              </DialogContent>
            </Dialog>
            <div className="my-4 h-[1px] w-full shrink-0 bg-border"></div>
            <button
              className="flex w-full justify-between px-4 py-1.5 text-red-700 hover:bg-red-50"
              onClick={handleDeleteAccount}
            >
              Eliminar <Trash2 />
            </button>
          </PopoverContent>
        </Popover>
      </Dialog>
      <AccountCardContent {...{ id, name, taxServicePassword, taxServiceUser, createdAt }} />
    </section>
  )
}

export default AccountCard
