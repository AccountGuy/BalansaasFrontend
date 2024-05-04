export interface LoginData {
  email: string
  password: string
}

export interface UserData {
  email: string | null
  token: string | null
  name: string | null
}
