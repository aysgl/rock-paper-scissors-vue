import axios from 'axios'
import { handleError } from '../utils/errorHandler'

const baseURL = (import.meta as ImportMeta).env?.VITE_API_URL || 'http://localhost:5001'

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding common headers or tokens
api.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error with our error handler utility
    handleError('API Request', error, false)
    return Promise.reject(error)
  },
)
