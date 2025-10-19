import axios from 'axios'

const baseURL = (import.meta as ImportMeta).env?.VITE_API_URL || 'http://localhost:5001'

export const api = axios.create({
  baseURL,
  timeout: 10000,
})

// Error interceptor for better debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  },
)
