import { AlertTriangle, RotateCcw } from 'lucide-react'
import { ERROR_MESSAGE, ERROR_TITLE, ERROR_RETRY_BUTTON } from '../constants/ui'

interface ErrorStateProps {
  onRetry: () => void
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-[#E5E7EB] bg-white px-8 py-10 text-center shadow-sm">
    <div className="mb-4 rounded-full bg-[#EFF6FF] p-3 text-[#173D6D]">
      <AlertTriangle size={24} />
    </div>
    <h2 className="text-xl font-semibold text-[#173D6D]">{ERROR_TITLE}</h2>
    <p className="mt-2 max-w-md text-sm text-slate-600">{ERROR_MESSAGE}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 inline-flex items-center gap-2 rounded-3xl bg-[#173D6D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#122d58]"
    >
      <RotateCcw size={16} /> {ERROR_RETRY_BUTTON}
    </button>
  </div>
)
