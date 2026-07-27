interface CompanyFilterListProps {
  companies: string[]
  selectedCompanies: string[]
  onToggle: (company: string) => void
  showCompanyNameTitle?: boolean
}

export const CompanyFilterList = ({
  companies,
  selectedCompanies,
  onToggle,
  showCompanyNameTitle = false,
}: CompanyFilterListProps) => (
  <div className="space-y-2 overflow-y-auto pr-2">
    {companies.map((company) => {
      const isSelected = selectedCompanies.includes(company)

      return (
        <label
          key={company}
          className={`flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
            isSelected
              ? 'border-[#4F46E5] bg-[#EFF6FF] text-[#173D6D]'
              : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-[#4F46E5]'
          }`}
        >
          <span className="min-w-0 truncate" title={showCompanyNameTitle ? company : undefined}>{company}</span>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(company)}
            className="h-4 w-4 rounded border-[#E5E7EB] text-[#4F46E5] focus:ring-[#4F46E5]"
          />
        </label>
      )
    })}
  </div>
)
