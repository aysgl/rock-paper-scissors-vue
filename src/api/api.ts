import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5001',
})

export const getChoices = async () => {
  const response = await api.get('/choices')
  return response.data
}

export const getRules = async () => {
  const response = await api.get('/rules')
  return response.data
}
