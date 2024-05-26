const jsonString =
  '[{"year": 2022, "month": 11, "information": [{"code":548,"value":20},{"code":520,"value":1835203},{"code":762,"value":0},{"code":766,"value":1348714},{"code":525,"value":0},{"code":528,"value":258386},{"code":532,"value":185221},{"code":535,"value":2},{"code":553,"value":3},{"code":562,"value":1929772},{"code":514,"value":0},{"code":521,"value":0},{"code":62,"value":0},{"code":49,"value":1030107},{"code":155,"value":0},{"code":54,"value":0},{"code":56,"value":0},{"code":151,"value":513374},{"code":153,"value":0},{"code":48,"value":238264}]}]'
import type { SiiF29YearData, DataSheetRowDataProps } from '@/schemas'

export const exampleData = JSON.parse(jsonString) as SiiF29YearData[]

const obtainSingleCode = (data: DataSheetRowDataProps[], code: number): number => {
  const filteredCodeItem = data.find((item) => item.code === code)
  return filteredCodeItem?.value || 0
}

const obtainByCodes = (data: DataSheetRowDataProps[], codes: number[]): number => {
  const filteredCodes = data.filter((item) => codes.includes(item.code))
  return filteredCodes.reduce((prev, item) => prev + item.value, 0)
}

export const obtainFiscalDebit = (data: DataSheetRowDataProps[]): number => {
  // Responds to 'Débito fiscal'
  const fiscalDebtCode = 548
  return obtainSingleCode(data, fiscalDebtCode)
}

export const obtainFiscalCredit = (data: DataSheetRowDataProps[]): number => {
  // Responds to 'Crédito fiscal'
  const codes = [520, 762, 766, 525, 528, 532]
  return obtainByCodes(data, codes)
}

export const obtainExportation = (data: DataSheetRowDataProps[]): number => {
  const codes = [535, 553]
  return obtainByCodes(data, codes)
}

export const obtainExemptExpenses = (data: DataSheetRowDataProps[]): number => {
  // Responds to 'Gastos exentos'
  const codes = [562, 514, 521]
  return obtainByCodes(data, codes)
}

export const obtainPPM = (data: DataSheetRowDataProps[]): number => {
  // Responds to 'PPM' or 'Pagos Provisionales Mensuales'
  const code = 62
  return obtainSingleCode(data, code)
}

export const obtainWithholdingFees = (data: DataSheetRowDataProps[]): number => {
  // Responds 'Retencion de honorarios'
  const code = 151
  return obtainSingleCode(data, code)
}

export const obtainTransitoryFees = (data: DataSheetRowDataProps[]): number => {
  // Responds 'Retencion de honorarios'
  const codes = [49, 153]
  return obtainByCodes(data, codes)
}

export const obtainUniqueFee = (data: DataSheetRowDataProps[]): number => {
  // Responds 'Impuesto único'
  const code = 48
  return obtainSingleCode(data, code)
}

export const jsonToTableData = (data: SiiF29YearData[]): number[][] => {
  return data
    .map((monthData) =>
      monthData.information.map((info) => [monthData.year, monthData.month, info.code, info.value])
    )
    .flat()
}

// [155, 54, 56]
