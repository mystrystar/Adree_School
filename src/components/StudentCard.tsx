import { motion } from 'framer-motion'
import { ExternalLink, Mail, Phone, Building2, ArrowRight } from 'lucide-react'
import type { Student } from '../types/student'

interface StudentCardProps {
  student: Student
  onOpenDetails: (student: Student) => void
}

export const StudentCard = ({ student, onOpenDetails }: StudentCardProps) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=173D6D&color=fff&size=128`

  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpenDetails(student)}
      className="group flex min-h-full flex-col rounded-[32px] border border-[#E5E7EB] bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-indigo-300 hover:shadow-2xl"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#4338CA]">{student.company.name}</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950">{student.name}</h3>
        </div>
        <div className="rounded-2xl bg-[#EFF6FF] p-3 text-[#3730A3] shadow-sm">
          <Building2 size={18} />
        </div>
      </div>

      <div className="mb-5 flex items-center gap-4 rounded-[28px] bg-[#F8FAFC] p-4">
        <img src={avatarUrl} alt={student.name} className="h-16 w-16 rounded-full border border-[#E5E7EB]" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">{student.username}</p>
          <p className="text-xs text-slate-500">Profile</p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-slate-400" />
          <span className="min-w-0 truncate text-slate-700">{student.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-slate-400" />
          <span className="min-w-0 truncate text-slate-700">{student.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <ExternalLink size={16} className="text-slate-400" />
          <span className="min-w-0 truncate text-slate-700">{student.website}</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm text-[#173D6D]">
        <span className="font-semibold">View Details</span>
        <ArrowRight size={18} />
      </div>
    </motion.button>
  )
}
