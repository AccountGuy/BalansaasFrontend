import axios from "axios";
import type { UserData } from "../schemas";
import { localStorageKey } from "../stores/authStore";

const apiBaseUrl: string = import.meta.env.VITE_API_BACKEND_URL

export const obtainAuthorization = () => {
  const authDataRaw = localStorage.getItem(localStorageKey)
  if (authDataRaw) {
    const userData = JSON.parse(authDataRaw).state as UserData | undefined
    return { Authorization: userData?.token ?? '' }
  }

  return { Authorization: '' }
}

export const apiRequest = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
  headers: {'Content-Type': 'application/json'},
});