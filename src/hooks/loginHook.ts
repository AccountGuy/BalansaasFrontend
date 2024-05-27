import { useEffect } from 'react'
import { useLoginStore } from '@/stores/authStore'
import { useRouter } from '@tanstack/react-router'
import { toast } from '@/components/ui/use-toast'

interface LoginHookProps {
  redirectCallback: () => Promise<void>
  type: 'success' | 'failure'
}

export const useLoginHook = ({ redirectCallback, type }: LoginHookProps) => {
  const { token } = useLoginStore()

  const router = useRouter()
  const checkTokenAndReturn = async () => {
    if (token && type === 'success') {
      await router.invalidate()
      redirectCallback()
    }
    if (!token && type === 'failure') {
      await router.invalidate()
      toast({ variant: 'default', title: 'No estás autenticado para ingresar a esta página' })
      redirectCallback()
    }
  }

  useEffect(() => {
    checkTokenAndReturn()
  }, [])
}
