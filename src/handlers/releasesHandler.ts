import type { Release } from '@/schemas'
import { apiRequest, obtainAuthorization } from '.'

export const getAllReleases = async (): Promise<Release[]> => {
  const releasesData = (await apiRequest.get('api/v1/releases', {
    headers: obtainAuthorization(),
  })) as { data: Release[] }
  console.log(releasesData)
  return releasesData.data
}
