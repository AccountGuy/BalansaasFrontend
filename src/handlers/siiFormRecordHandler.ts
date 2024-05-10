import { apiRequest, obtainAuthorization } from "."
import { SiiFormRecordProps } from "@/schemas/forms";
import type { SiiF29YearData } from "@/schemas";

export const postForSiiFormRecords = async (siiFormRecordFormData: SiiFormRecordProps): Promise<SiiF29YearData[]> => {
  const accountsData = await apiRequest.post(
    'api/v1/sii_form_records/fetch_data',
    siiFormRecordFormData,
    { headers: obtainAuthorization() }
  ) as { data: SiiF29YearData[] };
  return accountsData.data
}