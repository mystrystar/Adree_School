import axios from 'axios'
import { studentsSchema } from '../constants/studentSchema'
import type { Student } from '../types/student'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await api.get('/users')
  return studentsSchema.parse(response.data)
}
