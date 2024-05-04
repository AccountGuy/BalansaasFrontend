import { useEffect } from "react";
import { useLoginStore } from "@/stores/authStore";
import { useRouter } from "@tanstack/react-router";
import { toast } from "@/components/ui/use-toast";

interface LoginHookProps {
  redirectCallback: () => Promise<void>
  type: 'success' | 'failure'
  withToast?: boolean
}

export const useLoginHook = ({ redirectCallback, type, withToast = true }: LoginHookProps) => {
  const { token } = useLoginStore();
  
  const router = useRouter();
  const checkTokenAndReturn = async () => {
    if (token && type === 'success') {
      await router.invalidate();
      redirectCallback();
    }
    if (!token && type === 'failure') {
      await router.invalidate();
      redirectCallback();
    }
  };

  useEffect(() => {
    if (withToast && type === 'failure') {
      toast({variant: 'default', title: 'No estás autenticado para ingresar a esta página'})
    }
    checkTokenAndReturn();
  }, []);
}