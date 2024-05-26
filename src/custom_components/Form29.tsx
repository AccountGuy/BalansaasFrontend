import { FormEvent, useState } from 'react'
// import { excelGeneration } from '@/services/generate_excel'
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
import { F29ExcelGenerationHandler } from '@/handlers/serviceHandler'

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
    const f29Data = await mutateAsync({
      account_id: selectedAccount as number,
      year: selectedYear as number,
    })
    if (!isError && !isPending) {
      // await excelGeneration(f29Data) //! Remove this after
      const excelResponse = await F29ExcelGenerationHandler(f29Data)
	  const blob = new Blob([excelResponse], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'balansaas_excel.xlsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
  }

  return (
    <article className="flex w-full items-center justify-center">
      <div className="mt-4 w-4/5 rounded border border-gray-300 px-10 py-8">
        <form onSubmit={handleSubmitAction}>
          <h1 className="mb-3 text-2xl">Completa el formulario</h1>
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
      </div>
    </article>
  )
}

export default Form29
