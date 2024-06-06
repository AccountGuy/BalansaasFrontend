import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { createAccount } from '@/handlers/accountsHandler'
import { AccountFormProps, AccountSchema } from '@/schemas/forms'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const AccountsHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormProps>({
    resolver: zodResolver(AccountSchema),
  })

  const queryClient = useQueryClient()
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: createAccount,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['accounts'],
        refetchType: 'all',
      }),
  })

  const onSubmitAccount: SubmitHandler<AccountFormProps> = async (data) => {
    const accountResponse = await mutateAsync(data)
    if (isError) {
      toast({
        variant: 'destructive',
        title: `Problem with the creation`,
      })
    } else {
      toast({
        variant: 'success',
        title: `Cuenta "${accountResponse.name}" creada!`,
      })
      setIsModalOpen(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <header className="title-spacing flex items-start">
        <div className="flex-1">
          <h1>Cuentas SII</h1>
        </div>
        <div>
          <DialogTrigger className="btn-option font-semibold">
            <div className="mr-2">Añadir Cuenta</div>
            <div>
              <Plus />
            </div>
          </DialogTrigger>
        </div>
      </header>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade una cuenta SII</DialogTitle>
        </DialogHeader>
        <section className="mt-3">
          <form onSubmit={handleSubmit(onSubmitAccount)}>
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
              Añadir Cuenta
            </button>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default AccountsHeader
