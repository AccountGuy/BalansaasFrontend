import axios from "axios";
import type { LoginData, UserData } from "../schemas";
import { localStorageKey } from "../stores/authStore";

const apiBaseUrl: string = import.meta.env.VITE_API_BACKEND_URL

const obtainSessionToken = () => {
  const authDataRaw = localStorage.getItem(localStorageKey)
  if (authDataRaw) {
    const userData = JSON.parse(authDataRaw) as UserData | undefined
    return userData?.token
  }

  return null
}

const axiosRequest = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
  headers: {'Content-Type': 'application/json', Authorization: obtainSessionToken()},
});

export const sessionLoginHandler = async (loginData: LoginData): Promise<UserData | undefined> => {
  try {
    const loginResponse = await axiosRequest.post('login', { user: loginData })
    return { ...loginResponse.data, token: loginResponse.headers.authorization }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log('Error on axios request error: ', e.cause, '\nWith code:', e.code)
    }
  }
}