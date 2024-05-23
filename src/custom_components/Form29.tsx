import { FormEvent, useState } from 'react'
import { excelGeneration } from '@/services/generate_excel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AccountSelect } from '@/schemas'
import { getDateRanges } from '@/lib/date_utils'
import { postForSiiFormRecords } from '@/handlers/siiFormRecordHandler'
import { useMutation } from '@tanstack/react-query'

interface Form29Props {
  accounts: AccountSelect[]
}

const years = getDateRanges().reverse()

const Form29 = ({ accounts }: Form29Props) => {
  const [selectedAccount, setSelectedAccount] = useState<number>()
  const [selectedYear, setSelectedYear] = useState<number>()
  // const { register, handleSubmit } = useForm<SiiFormRecordProps>();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: postForSiiFormRecords,
  })

  const handleSubmitAction = async (e: FormEvent) => {
    e.preventDefault()
    const f29Data = await mutateAsync({
      account_id: selectedAccount as number,
      year: selectedYear as number,
    })
    if (!isError && !isPending) {
      await excelGeneration(f29Data)
    }
  }

  return (
    <article className="min-w-80 max-w-96">
      <form onSubmit={handleSubmitAction}>
        <section className="form-field">
          <label className="label-field">Selecciona la cuenta</label>
          <Select onValueChange={(account) => setSelectedAccount(Number(account))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona la cuenta" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map(({ id, name }) => (
                <SelectItem key={id.toString()} value={id.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
        <section className="form-field">
          <label className="label-field">Año de formulario</label>
          <Select onValueChange={(year) => setSelectedYear(Number(year))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.toString()} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
        <section className="flex flex-col gap-2">
          <div>
            <button className="btn w-full" disabled={isPending}>
              Generar Excel SII
            </button>
          </div>
          <div>
            <button className="btn w-full disabled:bg-red-300" disabled>
              Generar PDFs (Siguiente version)
            </button>
          </div>
        </section>
      </form>
    </article>
  )
}

export default Form29
