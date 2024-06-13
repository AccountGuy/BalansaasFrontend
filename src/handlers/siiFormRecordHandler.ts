import { apiRequest, obtainAuthorization } from '.'
import { SiiFormRecordProps } from '@/schemas/forms'

interface PostF29Response {
  message: string
}

export const postForSiiFormRecords = async (
  siiFormRecordFormData: SiiFormRecordProps
): Promise<PostF29Response> => {
  const accountsData = (await apiRequest.post(
    'api/v1/sii_form_records/fetch_data',
    siiFormRecordFormData,
    { headers: obtainAuthorization() }
  )) as { data: PostF29Response }
  console.log('From Backend')
  console.log(accountsData.data);
  return accountsData.data
}
