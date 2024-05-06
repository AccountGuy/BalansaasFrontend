import ExcelJS from 'exceljs'
const jsonString = '[{"code":548,"value":0},{"code":520,"value":1835203},{"code":762,"value":0},{"code":766,"value":1348714},{"code":525,"value":0},{"code":528,"value":258386},{"code":532,"value":185221},{"code":535,"value":0},{"code":553,"value":0},{"code":562,"value":1929772},{"code":514,"value":0},{"code":521,"value":0},{"code":62,"value":0},{"code":49,"value":1030107},{"code":155,"value":0},{"code":54,"value":0},{"code":56,"value":0},{"code":151,"value":513374},{"code":153,"value":0},{"code":48,"value":238264}]';

interface DataSheetRowDataProps {
  code: number
  value: number
}

const exampleData = JSON.parse(jsonString) as DataSheetRowDataProps[];

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

export async function generateExcel(blob: any) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(blob);

  const dataSheetName = 'BRUTO'
  const worksheetData = workbook.addWorksheet(dataSheetName);

  // Add content to a specific cell
  const rowData = exampleData.map((row) => [row.code, row.value])
  worksheetData.addRow(['code', 'value'])
  worksheetData.addRows(rowData)

  // Save the workbook
  const buffer = await workbook.xlsx.writeBuffer();
  const newExcelContentBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(newExcelContentBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'balansaas_excel.xlsx';
  a.click();
}