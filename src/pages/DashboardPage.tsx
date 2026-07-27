import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, SunMedium, Search, ArrowUpDown, SlidersHorizontal, X } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { useStudents } from '../hooks/useStudents'
import { StudentCard } from '../components/StudentCard'
import { StudentDetailsDrawer } from '../components/StudentDetailsDrawer'
import { LoadingState } from '../components/LoadingState'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { COMPANY_SEARCH_PLACEHOLDER, SEARCH_PLACEHOLDER, SORT_OPTIONS } from '../constants/ui'
import type { Student } from '../types/student'

export const DashboardPage = () => {
  const { theme, toggleTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [companySearch, setCompanySearch] = useState('')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          <section className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/70">

            <div className="mt-8 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="hidden rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950 lg:block lg:sticky lg:top-[100px] lg:h-fit lg:self-start lg:w-[250px] lg:shrink-0 lg:overflow-hidden">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#173D6D]">Filters</p>
                  <p className="mt-1 text-sm text-slate-500">By employer</p>
                </div>
                <button type="button" onClick={clearFilters} className="text-sm font-semibold text-[#4F46E5] transition hover:text-[#173D6D]">
                  Reset
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

              <div className="space-y-2 overflow-y-auto pr-2">
                {visibleCompanies.map((company) => {
                  const active = selectedCompanies.includes(company)
                  return (
                    <label
                      key={company}
                      className={`flex min-w-0 cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                        active
                          ? 'border-[#4F46E5] bg-[#EFF6FF] text-[#173D6D]'
                          : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-[#4F46E5]'
                      }`}
                    >
                      <span className="min-w-0 truncate">{company}</span>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleCompany(company)}
                        className="h-4 w-4 rounded border-[#E5E7EB] text-[#4F46E5] focus:ring-[#4F46E5]"
                      />
                    </label>
                  )
                })}
              </div>

              <div className="mt-5 space-y-3 bg-[#F8FAFC] pb-4">
                <div className="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Selected</p>
                  <p className="mt-2 text-2xl font-semibold text-[#173D6D]">{selectedCompanies.length}</p>
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-3xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#173D6D] transition hover:bg-[#EFF6FF]"
                >
                  Reset filters
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full rounded-3xl bg-[#173D6D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#122d58]"
                >
                  Apply filters{selectedCompanies.length > 0 ? ` (${selectedCompanies.length})` : ''}
                </button>
              </div>
            </aside>

            <main className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="student-search-input"
                    aria-label="Search students"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={SEARCH_PLACEHOLDER}
                    className="h-16 w-full rounded-[24px] border border-[#E5E7EB] bg-white px-16 text-sm text-slate-950 outline-none transition focus:border-[#4F46E5] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    Ctrl + K
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="hidden h-14 items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 text-sm sm:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    <ArrowUpDown size={18} />
                    <select
                      aria-label="Sort students"
                      value={sort}
                      onChange={(event) => setSort(event.target.value as 'asc' | 'desc')}
                      className="w-full bg-transparent text-sm text-slate-900 outline-none"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  {/* <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex h-14 min-w-[64px] items-center justify-center rounded-3xl border border-[#E5E7EB] bg-white px-4 text-slate-700 transition hover:border-[#4F46E5] hover:bg-[#EFF6FF] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
                  </button> */}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#173D6D]"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
                <span className="text-sm text-slate-500">{selectedCompanies.length} selected</span>
              </div>

              <AnimatePresence>
                {isFilterDrawerOpen ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                      className="absolute bottom-0 left-0 right-0 rounded-t-3xl border border-[#E5E7EB] bg-white p-6 pb-8 shadow-2xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#173D6D]">Filters</p>
                          <p className="mt-1 text-sm text-slate-500">By employer</p>
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

                      <label className="mb-4 block rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-950">
                        <input
                          type="text"
                          value={companySearch}
                          onChange={(event) => setCompanySearch(event.target.value)}
                          placeholder={COMPANY_SEARCH_PLACEHOLDER}
                          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                      </label>

                      <div className="max-h-[280px] space-y-2 overflow-y-auto pr-1">
                        {visibleCompanies.map((company) => {
                          const active = selectedCompanies.includes(company)
                          return (
                            <label
                              key={company}
                              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                                active
                                  ? 'border-[#4F46E5] bg-[#EFF6FF] text-[#173D6D]'
                                  : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-[#4F46E5]'
                              }`}
                            >
                              <span>{company}</span>
                              <input
                                type="checkbox"
                                checked={active}
                                onChange={() => toggleCompany(company)}
                                className="h-4 w-4 rounded border-[#E5E7EB] text-[#4F46E5] focus:ring-[#4F46E5]"
                              />
                            </label>
                          )
                        })}
                      </div>

                      <div className="mt-5 space-y-3">
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="w-full rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#173D6D] transition hover:bg-[#EFF6FF]"
                        >
                          Reset filters
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsFilterDrawerOpen(false)}
                          className="w-full rounded-3xl bg-[#173D6D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#122d58]"
                        >
                          Apply filters
                        </button>
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
