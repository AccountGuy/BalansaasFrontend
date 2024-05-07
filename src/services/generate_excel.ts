import ExcelJS from 'exceljs'
import type { Worksheet } from 'exceljs'
import { jsonToTableData, exampleData, obtainFiscalCredit, obtainFiscalDebit, obtainExportation, obtainExemptExpenses, obtainTransitoryFees, obtainWithholdingFees, obtainUniqueFee } from './sii_formulas';

export async function excelGeneration() {
  try {
    // Path to the Excel file in the public directory
    const filePath = '/master_template.xlsx';
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    await generateExcel(blob);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function generateExcel(blob: any) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(blob);

  const supportSheetName = 'BRUTO'
  const worksheetSupport = workbook.addWorksheet(supportSheetName)

  // Add the support information
  worksheetSupport.addRow(['año', 'mes', 'code', 'value'])
  worksheetSupport.addRows(jsonToTableData(exampleData))

  // Fill the cells with the aggregate data
  const dataSheetName = 'DATOS'
  const worksheetData = workbook.getWorksheet(dataSheetName);

  if (worksheetData !== undefined) {
    saveFiscalDebt(worksheetData)
    savePPM(worksheetData)
    saveTransitoryFees(worksheetData)
    saveWithholdingFees(worksheetData)
    // Next Table
    saveFiscalCredit(worksheetData)
    saveExemptExpenses(worksheetData)
    saveUniqueFee(worksheetData)
  }

  // Save the workbook
  const buffer = await workbook.xlsx.writeBuffer();
  const newExcelContentBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(newExcelContentBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'balansaas_excel.xlsx';
  a.click();
}

function saveFiscalDebt(worksheet: Worksheet) {
  const offsetRow = 14
  const offsetColumn = 5
  exampleData.map(monthData => {
    const cellData = obtainFiscalDebit(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function savePPM(worksheet: Worksheet) {
  // Pagos provisionales mensuales (62)
  const offsetRow = 14
  const offsetColumn = 6
  exampleData.map(monthData => {
    const cellData = obtainExemptExpenses(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveWithholdingFees(worksheet: Worksheet) {
  // Responds 'Retencion de honorarios'
  const offsetRow = 14
  const offsetColumn = 7
  exampleData.map(monthData => {
    const cellData = obtainWithholdingFees(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveTransitoryFees(worksheet: Worksheet) {
  // Respond for Impuestos transitorios [153 + 49]
  const offsetRow = 14
  const offsetColumn = 8
  exampleData.map(monthData => {
    const cellData = obtainTransitoryFees(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveFiscalCredit(worksheet: Worksheet) {
  const offsetRow = 35
  const offsetColumn = 5
  exampleData.map(monthData => {
    const cellData = obtainFiscalCredit(monthData.information) + obtainExportation(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveExemptExpenses(worksheet: Worksheet) {
  // Respond for 'Gastos exentos'
  const offsetRow = 35
  const offsetColumn = 6
  exampleData.map(monthData => {
    const cellData = obtainExemptExpenses(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}

function saveUniqueFee(worksheet: Worksheet) {
  // Respond for 'Impuesto único'
  const offsetRow = 35
  const offsetColumn = 9
  exampleData.map(monthData => {
    const cellData = obtainUniqueFee(monthData.information)
    worksheet.getCell(offsetRow + monthData.month, offsetColumn).value = cellData
  })
}