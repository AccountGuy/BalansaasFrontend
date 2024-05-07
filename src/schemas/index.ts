export interface LoginData {
  email: string
  password: string
}

export interface UserData {
  email: string | null
  token: string | null
  name: string | null
}

export interface SiiF29YearData {
  year: number
  month: number
  information: DataSheetRowDataProps[]
}

export interface DataSheetRowDataProps {
  code: number
  value: number
}