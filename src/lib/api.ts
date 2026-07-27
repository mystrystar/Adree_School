import axios from 'axios'
import type { Student } from '../types/student'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/users')
  return response.data
}
