import type { LoginData, UserData } from "@/schemas"
import { apiRequest } from "."
import { isAxiosError } from "axios"

export const sessionLoginHandler = async (loginData: LoginData): Promise<UserData | undefined> => {
  try {
    const loginResponse = await apiRequest.post('login', { user: loginData })
    return { ...loginResponse.data, token: loginResponse.headers.authorization }
  } catch (e) {
    if (isAxiosError(e)) {
      console.log('Error on axios request error: ', e.cause, '\nWith code:', e.code)
    }
  }
}