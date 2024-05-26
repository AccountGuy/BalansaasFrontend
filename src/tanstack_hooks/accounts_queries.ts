import { deleteAccount, updateAccount } from '@/handlers/accountsHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['accounts'],
        refetchType: 'all',
      }),
  })
}

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['accounts'],
        refetchType: 'all',
      }),
  })
}
