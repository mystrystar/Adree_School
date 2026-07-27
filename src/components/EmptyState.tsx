import { SearchX } from 'lucide-react'
import { EMPTY_MESSAGE } from '../constants/ui'

interface EmptyStateProps {
  onClearFilters: () => void
}

export const EmptyState = ({ onClearFilters }: EmptyStateProps) => (
  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#E5E7EB] bg-white px-8 py-10 text-center shadow-sm">
    <div className="mb-4 rounded-full bg-[#EFF6FF] p-3 text-[#173D6D]">
      <SearchX size={24} />
    </div>
    <h2 className="text-xl font-semibold text-[#173D6D]">No students found</h2>
    <p className="mt-2 max-w-md text-sm text-slate-600">{EMPTY_MESSAGE}</p>
    <button
      type="button"
      onClick={onClearFilters}
      className="mt-6 rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-3 text-sm font-semibold text-[#173D6D] transition hover:bg-[#EFF6FF]"
    >
      Reset Filters
    </button>
  </div>
)
