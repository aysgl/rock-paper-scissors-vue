export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: unknown
}

export interface ErrorState {
  hasError: boolean
  message: string
  code?: string
}

export type ErrorType = 'network' | 'validation' | 'server' | 'unknown'
