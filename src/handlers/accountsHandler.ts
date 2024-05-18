import type { Account, AccountSelect } from '@/schemas'
import { apiRequest, obtainAuthorization } from '.'
import { AccountFormProps } from '@/schemas/forms'

export const getAllAccounts = async (): Promise<Account[]> => {
  const accountsData = (await apiRequest.get('api/v1/accounts', {
    headers: obtainAuthorization(),
  })) as { data: Account[] }
  return accountsData.data
}

export const getSelectAccount = async (): Promise<AccountSelect[]> => {
  const accountsData = (await apiRequest.get('api/v1/accounts/select', {
    headers: obtainAuthorization(),
  })) as { data: Account[] }
  return accountsData.data
}

export const createAccount = async (accountData: AccountFormProps): Promise<Account> => {
  const accountsData = (await apiRequest.post(
    'api/v1/accounts',
    { account: accountData },
    { headers: obtainAuthorization() }
  )) as { data: Account }
  return accountsData.data
}

export const updateAccount = async (
  accountData: AccountFormProps & { id: string }
): Promise<Account> => {
  const { id, ...accountInfo } = accountData
  const accountsData = (await apiRequest.patch(
    `api/v1/accounts/${accountData.id}`,
    { account: accountInfo },
    { headers: obtainAuthorization() }
  )) as { data: Account }
  return accountsData.data
}

export const deleteAccount = async (id: string): Promise<Account> => {
  const accountsData = (await apiRequest.delete(`api/v1/accounts/${id}`, {
    headers: obtainAuthorization(),
  })) as { data: Account }
  return accountsData.data
}
