import { z, ZodType } from 'zod'
import { validateChileanRUT } from '@/lib/rut_utils'

export interface AccountFormProps {
  name: string
  tax_service_user: string
  tax_service_password: string
}

export const AccountSchema: ZodType<AccountFormProps> = z.object({
  name: z.string(),
  tax_service_user: z
    .string()
    .transform((rut) => rut.replace(/\./g, ''))
    .refine((s) => s.includes('-'), 'El rut debe tener guión')
    .refine((s) => validateChileanRUT(s), 'El rut es inválido'),
  tax_service_password: z.string(),
})

export interface SiiFormRecordProps {
  account_id: number
  year: number
}
