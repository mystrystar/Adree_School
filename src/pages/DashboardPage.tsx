import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ArrowUpDown, SlidersHorizontal, X } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { useStudents } from '../hooks/useStudents'
import { StudentCard } from '../components/StudentCard'
import { StudentDetailsDrawer } from '../components/StudentDetailsDrawer'
import { LoadingState } from '../components/LoadingState'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'
import { CompanyFilterList } from '../components/CompanyFilterList'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  COMPANY_SEARCH_PLACEHOLDER,
  FILTERS_APPLY_BUTTON,
  FILTERS_LABEL,
  FILTERS_RESET,
  FILTERS_RESET_BUTTON,
  FILTERS_SELECTED_LABEL,
  FILTERS_SUBTITLE,
  KEYBOARD_SHORTCUT,
  SEARCH_ARIA_LABEL,
  SEARCH_PLACEHOLDER,
  SORT_ARIA_LABEL,
  SORT_OPTIONS,
} from '../constants/ui'
import type { SortDirection } from '../constants/ui'
import type { Student } from '../types/student'

export const DashboardPage = () => {
  const [search, setSearch] = useState('')
  const [companySearch, setCompanySearch] = useState('')
  const [sort, setSort] = useState<SortDirection>('asc')
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, isError, refetchStudents, filteredStudents } = useStudents(debouncedSearch, selectedCompanies, sort)

  const companyOptions = useMemo(() => {
    const companies = data?.map((student) => student.company.name) ?? []
    return Array.from(new Set(companies)).sort()
  }, [data])

  const visibleCompanies = useMemo(() => {
    if (!companySearch.trim()) return companyOptions
    return companyOptions.filter((company) => company.toLowerCase().includes(companySearch.toLowerCase()))
  }, [companyOptions, companySearch])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedStudent(null)
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        const searchInput = document.getElementById('student-search-input') as HTMLInputElement | null
        searchInput?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggleCompany = (company: string) => {
    setSelectedCompanies((current) =>
      current.includes(company) ? current.filter((value) => value !== company) : [...current, company],
    )
  }

  const clearFilters = () => {
    setSearch('')
    setCompanySearch('')
    setSelectedCompanies([])
    setSort('asc')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 transition-colors">
      <Header />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          <section className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/70">

            <div className="mt-8 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="hidden rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950 lg:block lg:sticky lg:top-[100px] lg:h-fit lg:self-start lg:w-[250px] lg:shrink-0 lg:overflow-hidden">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#173D6D]">{FILTERS_LABEL}</p>
                  <p className="mt-1 text-sm text-slate-500">{FILTERS_SUBTITLE}</p>
                </div>
                <button type="button" onClick={clearFilters} className="text-sm font-semibold text-[#4F46E5] transition hover:text-[#173D6D]">
                  {FILTERS_RESET}
                </button>
              </div>

              <label className="mb-4 block rounded-3xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm shadow-sm">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={companySearch}
                    onChange={(event) => setCompanySearch(event.target.value)}
                    placeholder={COMPANY_SEARCH_PLACEHOLDER}
                    className="w-full bg-transparent pl-10 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <CompanyFilterList companies={visibleCompanies} selectedCompanies={selectedCompanies} onToggle={toggleCompany} />

              <div className="mt-5 space-y-3 bg-[#F8FAFC] pb-4">
                <div className="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{FILTERS_SELECTED_LABEL}</p>
                  <p className="mt-2 text-2xl font-semibold text-[#173D6D]">{selectedCompanies.length}</p>
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-3xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#173D6D] transition hover:bg-[#EFF6FF]"
                >
                  {FILTERS_RESET_BUTTON}
                </button>
                <button
                  type="button"
                  className="w-full rounded-3xl bg-[#173D6D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#122d58]"
                >
                  {FILTERS_APPLY_BUTTON}{selectedCompanies.length > 0 ? ` (${selectedCompanies.length})` : ''}
                </button>
              </div>
            </aside>

            <main className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="student-search-input"
                    aria-label={SEARCH_ARIA_LABEL}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={SEARCH_PLACEHOLDER}
                    className="h-16 w-full rounded-[24px] border border-[#E5E7EB] bg-white px-16 text-sm text-slate-950 outline-none transition focus:border-[#4F46E5] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    {KEYBOARD_SHORTCUT}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                          <label className="hidden h-16 items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 text-sm sm:flex">
                    <ArrowUpDown size={18} />
                    <select
                      aria-label={SORT_ARIA_LABEL}
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortDirection)}
                      className="w-full bg-transparent text-sm text-slate-900 outline-none"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                </div>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:hidden">
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#173D6D]"
                >
                  <SlidersHorizontal size={16} /> {FILTERS_LABEL}
                </button>
                <span className="text-sm text-slate-500">{selectedCompanies.length} selected</span>
              </div>

              <AnimatePresence>
                {isFilterDrawerOpen ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.2 } }}
                    className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                      className="absolute inset-x-0 top-6 bottom-0 h-[calc(100vh-3rem)] overflow-hidden rounded-t-3xl border border-[#E5E7EB] bg-white shadow-2xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex h-full flex-col">
                        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
                          <div className="mb-5 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#173D6D]">{FILTERS_LABEL}</p>
                              <p className="mt-1 text-sm text-slate-500">{FILTERS_SUBTITLE}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsFilterDrawerOpen(false)}
                              className="rounded-full border border-[#E5E7EB] p-2 text-slate-600 transition hover:bg-slate-100"
                              aria-label="Close filter drawer"
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div className="grid gap-3">
                            <label className="block rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm shadow-sm">
                              <input
                                type="text"
                                value={companySearch}
                                onChange={(event) => setCompanySearch(event.target.value)}
                                placeholder={COMPANY_SEARCH_PLACEHOLDER}
                                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                              />
                            </label>

                            <label className="flex items-center gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm shadow-sm">
                              <ArrowUpDown size={18} />
                              <select
                                aria-label={SORT_ARIA_LABEL}
                                value={sort}
                                onChange={(event) => setSort(event.target.value as SortDirection)}
                                className="w-full bg-transparent text-sm text-slate-900 outline-none"
                              >
                                {SORT_OPTIONS.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4">
                          <CompanyFilterList companies={visibleCompanies} selectedCompanies={selectedCompanies} onToggle={toggleCompany} showCompanyNameTitle />
                        </div>

                        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700">
                          <div className="space-y-3">
                            <button
                              type="button"
                              onClick={clearFilters}
                              className="w-full rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#173D6D] transition hover:bg-[#EFF6FF]"
                            >
                              {FILTERS_RESET_BUTTON}
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsFilterDrawerOpen(false)}
                              className="w-full rounded-3xl bg-[#173D6D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#122d58]"
                            >
                              {FILTERS_APPLY_BUTTON}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                {isLoading ? (
                  <LoadingState />
                ) : isError ? (
                  <ErrorState onRetry={() => refetchStudents()} />
                ) : filteredStudents.length === 0 ? (
                  <EmptyState onClearFilters={clearFilters} />
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 items-stretch md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredStudents.map((student) => (
                      <StudentCard key={student.id} student={student} onOpenDetails={setSelectedStudent} />
                    ))}
                  </motion.div>
                )}
              </div>
            </main>
          </div>
        </section>
      </div>
      </div>

      <StudentDetailsDrawer student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      <Footer />
    </div>
  )
}
