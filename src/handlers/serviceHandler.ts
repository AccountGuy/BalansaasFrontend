import { isAxiosError } from 'axios'
import { serviceRequest } from '.'

interface F29ExcelGenerationHandlerProps {
  accountId: number
  year: number
}

export const f29ExcelGenerationHandler = async (
  { accountId, year }: F29ExcelGenerationHandlerProps
): Promise<any> => {
  try {
    const queryParameters = new URLSearchParams({account_id: accountId.toString(), year: year.toString()})
    const excelResponse = await serviceRequest.get(`f29_excel_generation?${queryParameters.toString()}`)
    return excelResponse.data
  } catch (e) {
    if (isAxiosError(e)) {
      console.log('Error on axios service call error: ', e.cause, '\nWith code:', e.code)
    }
  }
}
