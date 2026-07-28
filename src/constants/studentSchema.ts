import { z } from 'zod'
import type { Student } from '../types/student'

export const NOT_AVAILABLE = 'N/A'

// Names are intentionally permissive: letters, numbers, spaces, and special
// characters are all allowed. Only an empty or missing value becomes "N/A".
const textField = z.string().trim().min(1).catch(NOT_AVAILABLE)
const emailField = z.string().trim().email().catch(NOT_AVAILABLE)
const phoneField = z
  .union([z.string(), z.number()])
  .transform((value) => String(value).replace(/\D/g, ''))
  .pipe(z.string().min(1))
  .catch(NOT_AVAILABLE)

const defaultStudent: Student = {
  id: 0,
  name: NOT_AVAILABLE,
  username: NOT_AVAILABLE,
  email: NOT_AVAILABLE,
  phone: NOT_AVAILABLE,
  website: NOT_AVAILABLE,
  company: {
    name: NOT_AVAILABLE,
    catchPhrase: NOT_AVAILABLE,
    bs: NOT_AVAILABLE,
  },
  address: {
    street: NOT_AVAILABLE,
    suite: NOT_AVAILABLE,
    city: NOT_AVAILABLE,
    zipcode: NOT_AVAILABLE,
    geo: { lat: NOT_AVAILABLE, lng: NOT_AVAILABLE },
  },
}

const studentSchema = z
  .object({
    id: z.number().int().positive().catch(0),
    name: textField,
    username: textField,
    email: emailField,
    phone: phoneField,
    website: textField,
    company: z
      .object({
        name: textField,
        catchPhrase: textField,
        bs: textField,
      })
      .catch(defaultStudent.company),
    address: z
      .object({
        street: textField,
        suite: textField,
        city: textField,
        zipcode: textField,
        geo: z
          .object({ lat: textField, lng: textField })
          .catch(defaultStudent.address.geo),
      })
      .catch(defaultStudent.address),
  })
  .catch(defaultStudent)

export const studentsSchema = z.array(studentSchema)
