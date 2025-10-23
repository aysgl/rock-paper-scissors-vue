import type { AxiosError } from 'axios'
import type { ApiError, ErrorType } from '../types/error.types'

/**
 * Determines the type of error based on the error object
 * @param error - The error object to analyze
 * @returns The error type classification
 */
export const getErrorType = (error: unknown): ErrorType => {
  if (!error) return 'unknown'

  const axiosError = error as AxiosError

  if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ERR_NETWORK') {
    return 'network'
  }

  if (axiosError.response) {
    const status = axiosError.response.status
    if (status >= 400 && status < 500) return 'validation'
    if (status >= 500) return 'server'
  }

  return 'unknown'
}

/**
 * Formats an error into a user-friendly message
 * @param error - The error object to format
 * @returns Formatted error message
 */
export const formatErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError
  const errorType = getErrorType(error)

  switch (errorType) {
    case 'network':
      return 'Network error. Please check your internet connection and try again.'
    case 'validation':
      return axiosError.response?.data
        ? `Validation error: ${JSON.stringify(axiosError.response.data)}`
        : 'Invalid request. Please check your input.'
    case 'server':
      return 'Server error. Please try again later.'
    case 'unknown':
    default:
      if (axiosError.message) {
        return `An error occurred: ${axiosError.message}`
      }
      return 'An unexpected error occurred. Please try again.'
  }
}

/**
 * Creates a standardized API error object
 * @param error - The raw error object
 * @returns Standardized ApiError object
 */
export const createApiError = (error: unknown): ApiError => {
  const axiosError = error as AxiosError
  const message = formatErrorMessage(error)

  return {
    message,
    code: axiosError.code,
    status: axiosError.response?.status,
    details: axiosError.response?.data,
  }
}

/**
 * Logs error to console with structured format
 * @param context - Context where error occurred (e.g., 'fetchScoreboard')
 * @param error - The error object
 */
export const logError = (context: string, error: unknown): void => {
  const apiError = createApiError(error)
  console.error(`[${context}]`, {
    message: apiError.message,
    code: apiError.code,
    status: apiError.status,
    details: apiError.details,
  })
}

/**
 * Handles error with optional user notification
 * @param context - Context where error occurred
 * @param error - The error object
 * @param showToUser - Whether to show error to user (default: true)
 * @returns ApiError object
 */
export const handleError = (
  context: string,
  error: unknown,
  showToUser: boolean = true,
): ApiError => {
  const apiError = createApiError(error)
  logError(context, error)

  if (showToUser) {
    // In a real app, you would show a toast/notification here
    // For now, we'll use alert as a placeholder
    console.warn('User notification:', apiError.message)
  }

  return apiError
}
