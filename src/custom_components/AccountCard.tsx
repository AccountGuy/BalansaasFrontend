import { useState } from 'react'
import { partialHide } from '@/lib/string_utils'
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import type { Account } from '@/schemas'
import RelativeTime from './RelativeTime'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAccount, deleteAccount } from '@/handlers/accountsHandler'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AccountFormProps } from '@/schemas/forms'
import { toast } from '@/components/ui/use-toast'

const AccountCard = ({ id, name, taxServicePassword, taxServiceUser, createdAt }: Account) => {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit } = useForm<AccountFormProps>({
    defaultValues: {
      name,
      tax_service_user: taxServicePassword,
      tax_service_password: taxServicePassword,
    },
  })
  const {
    mutateAsync: mutateUpdateAccount,
    isPending,
    isError,
  } = useMutation({
    mutationFn: updateAccount,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['accounts'],
        refetchType: 'all',
      }),
  })

  const { mutateAsync: mutateDeleteAccount } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['accounts'],
        refetchType: 'all',
      }),
  })

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
    <section className="balansaas-gradient relative min-h-28 min-w-80 flex-1 rounded-md p-5 shadow-md">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}></Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <div className="absolute right-5 top-5 rounded-sm text-main-900 hover:bg-main-200/50">
            <EllipsisVertical />
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-36 space-y-1 border py-1">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger className="w-full">
              <button className="flex w-full justify-between bg-white px-4 py-1.5 text-gray-700 hover:bg-gray-100">
                Editar
                <SquarePen />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añade una cuenta SII</DialogTitle>
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
                  </div>
                  <div className="form-field">
                    <label className="label-field">Contraseña SII</label>
                    <input {...register('tax_service_password')} className="input-field" />
                  </div>
                  <button type="submit" className="btn w-full font-semibold" disabled={isPending}>
                    Actualizar Cuenta
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
