export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BACKEND_URL as string,
  wsBaseUrl: import.meta.env.VITE_WS_BACKEND_URL as string,
  goServiceUrl: import.meta.env.VITE_GO_SERVICE_URL as string,
} as const
