import { isAxiosError } from 'axios'
import { serviceRequest } from '.'
import { SiiF29YearData } from '@/schemas'

export const F29ExcelGenerationHandler = async (
  siiFormRecordsData: SiiF29YearData[]
): Promise<any> => {
  try {
    const excelResponse = await serviceRequest.post('f29_excel_generation', siiFormRecordsData)
    return excelResponse.data
  } catch (e) {
    if (isAxiosError(e)) {
      console.log('Error on axios service call error: ', e.cause, '\nWith code:', e.code)
    }
  }
}
