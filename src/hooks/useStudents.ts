import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchStudents } from '../lib/api'
import type { Student } from '../types/student'

export const useStudents = (search: string, companyFilter: string[], sort: 'asc' | 'desc') => {
  const queryClient = useQueryClient()

  const query = useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: fetchStudents,
    staleTime: 1000 * 60 * 5,
  })

  const filteredStudents = useMemo(() => {
    if (!query.data) return []

    const normalizedSearch = search.trim().toLowerCase()

    const filtered = query.data.filter((student) => {
      const matchesSearch =
        !normalizedSearch ||
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.email.toLowerCase().includes(normalizedSearch)

      const matchesCompany =
        companyFilter.length === 0 || companyFilter.includes(student.company.name)

      return matchesSearch && matchesCompany
    })

    return [...filtered].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name)
      return sort === 'asc' ? comparison : -comparison
    })
  }, [companyFilter, query.data, search, sort])

  return {
    ...query,
    filteredStudents,
    refetchStudents: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  }
}
