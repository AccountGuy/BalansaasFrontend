import type { Account, AccountSelect } from "@/schemas";
import { apiRequest, obtainAuthorization } from "."
import { AccountFormProps } from "@/schemas/forms";

export const getAllAccounts = async (): Promise<Account[]> => {
  const accountsData = await apiRequest.get('api/v1/accounts', { headers: obtainAuthorization() } ) as { data: Account[] };
  return accountsData.data
}

export const getSelectAccount = async (): Promise<AccountSelect[]> => {
  const accountsData = await apiRequest.get('api/v1/accounts/select', { headers: obtainAuthorization() } ) as { data: Account[] };
  return accountsData.data
}

export const createAccount = async (accountData: AccountFormProps): Promise<Account> => {
  const accountsData = await apiRequest.post(
    'api/v1/accounts',
    { account: accountData },
    { headers: obtainAuthorization() }
  ) as { data: Account };
  return accountsData.data
}
