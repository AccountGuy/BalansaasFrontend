import ExcelJS from 'exceljs'
import type { Worksheet } from 'exceljs'
import {
  jsonToTableData,
  obtainFiscalCredit,
  obtainFiscalDebit,
  obtainExportation,
  obtainExemptExpenses,
  obtainTransitoryFees,
  obtainWithholdingFees,
  obtainUniqueFee,
} from './sii_formulas'
import type { SiiF29YearData } from '@/schemas'

export async function excelGeneration(data: SiiF29YearData[]) {
  try {
    // Path to the Excel file in the public directory
    const filePath = '/master_template.xlsx'
    const response = await fetch(filePath)
    const arrayBuffer = await response.arrayBuffer()
    const blob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    await generateExcel(data, blob)
  } catch (error) {
    console.error('Error:', error)
  }
}

async function generateExcel(data: SiiF29YearData[], blob: any) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(blob)

  const supportSheetName = 'BRUTO'
  const worksheetSupport = workbook.addWorksheet(supportSheetName)

  // Add the support information
  worksheetSupport.addRow(['año', 'mes', 'code', 'value'])
  worksheetSupport.addRows(jsonToTableData(data))

  // Fill the cells with the aggregate data
  const dataSheetName = 'DATOS'
  const worksheetData = workbook.getWorksheet(dataSheetName)

  if (worksheetData !== undefined) {
    saveFiscalDebt(data, worksheetData)
    savePPM(data, worksheetData)
    saveTransitoryFees(data, worksheetData)
    saveWithholdingFees(data, worksheetData)
    // Next Table
    saveFiscalCredit(data, worksheetData)
    saveExemptExpenses(data, worksheetData)
    saveUniqueFee(data, worksheetData)
  }

  // Save the workbook
  const buffer = await workbook.xlsx.writeBuffer()
  const newExcelContentBlob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(newExcelContentBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'balansaas_excel.xlsx'
  a.click()
}

function saveFiscalDebt(data: SiiF29YearData[], worksheet: Worksheet) {
  const offsetRow = 14
  const offsetColumn = 5
  data.map((monthData) => {
    const cellData = obtainFiscalDebit(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function savePPM(data: SiiF29YearData[], worksheet: Worksheet) {
  // Pagos provisionales mensuales (62)
  const offsetRow = 14
  const offsetColumn = 6
  data.map((monthData) => {
    const cellData = obtainExemptExpenses(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveWithholdingFees(data: SiiF29YearData[], worksheet: Worksheet) {
  // Responds 'Retencion de honorarios'
  const offsetRow = 14
  const offsetColumn = 7
  data.map((monthData) => {
    const cellData = obtainWithholdingFees(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveTransitoryFees(data: SiiF29YearData[], worksheet: Worksheet) {
  // Respond for Impuestos transitorios [153 + 49]
  const offsetRow = 14
  const offsetColumn = 8
  data.map((monthData) => {
    const cellData = obtainTransitoryFees(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveFiscalCredit(data: SiiF29YearData[], worksheet: Worksheet) {
  const offsetRow = 35
  const offsetColumn = 5
  data.map((monthData) => {
    const cellData =
      obtainFiscalCredit(monthData.information) + obtainExportation(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveExemptExpenses(data: SiiF29YearData[], worksheet: Worksheet) {
  // Respond for 'Gastos exentos'
  const offsetRow = 35
  const offsetColumn = 6
  data.map((monthData) => {
    const cellData = obtainExemptExpenses(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveUniqueFee(data: SiiF29YearData[], worksheet: Worksheet) {
  // Respond for 'Impuesto único'
  const offsetRow = 35
  const offsetColumn = 9
  data.map((monthData) => {
    const cellData = obtainUniqueFee(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}
