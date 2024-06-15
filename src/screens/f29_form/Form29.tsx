import { useState, type FormEvent } from 'react'
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
import { f29ExcelGenerationHandler } from '@/handlers/serviceHandler'
import LoaderButtonContent from '@/components/loaders/LoaderButtonContent'
import { downloadBuffer } from '@/lib/buffer_utils'

interface Form29Props {
  accounts: AccountSelect[]
}

const years = getDateRanges().reverse()

const Form29 = ({ accounts }: Form29Props) => {
  const [selectedAccount, setSelectedAccount] = useState<number>()
  const [selectedYear, setSelectedYear] = useState<number>()
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: postForSiiFormRecords,
  })

  const handleSubmitAction = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync({
      account_id: selectedAccount as number,
      year: selectedYear as number,
    })
    if (!isError && !isPending) {
      const excelResponse = await f29ExcelGenerationHandler({
        accountId: selectedAccount as number,
        year: selectedYear as number,
      })
      const accountName = accounts.find(({ id }) => selectedAccount === id)?.name || 'Company'
      const fileName = `${accountName.trim()}_${selectedYear || 'Year'}`
      downloadBuffer(excelResponse, fileName)
    }
  }

  return (
    <article className="flex w-full min-w-[360px] items-center">
      <div className="card-border mt-4 w-full rounded px-10 pb-10 pt-6">
        <form onSubmit={handleSubmitAction}>
          <h1 className="mb-3 text-xl">Completa el formulario</h1>
          <section className="form-field py-1">
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
                {isPending ? (
                  <LoaderButtonContent label="Descargando Formularios" />
                ) : (
                  'Generar Excel SII'
                )}
              </button>
            </div>
          </section>
        </form>
      </div>
    </article>
  )
}

export default Form29
