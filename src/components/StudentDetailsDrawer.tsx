import { AnimatePresence, motion } from 'framer-motion'
import { X, MapPin, Globe, Briefcase, Building2, Mail, Phone, UserCircle2 } from 'lucide-react'
import type { Student } from '../types/student'

interface StudentDetailsDrawerProps {
  student: Student | null
  onClose: () => void
}

export const StudentDetailsDrawer = ({ student, onClose }: StudentDetailsDrawerProps) => {
  if (!student) return null

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4f46e5&color=fff&size=128`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="absolute right-0 top-0 h-full w-full overflow-y-auto border-l border-[#E5E7EB] bg-white p-6 shadow-2xl sm:w-full md:w-[460px] lg:w-[520px]"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-500">Student profile</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">{student.name}</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              onClick={onClose}
              aria-label="Close details"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <img src={avatarUrl} alt={student.name} className="h-20 w-20 rounded-2xl" />
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{student.username}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{student.company.name}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoRow icon={<Mail size={16} />} label="Email" value={student.email} />
              <InfoRow icon={<Phone size={16} />} label="Phone" value={student.phone} />
              <InfoRow icon={<Globe size={16} />} label="Website" value={student.website} />
              <InfoRow icon={<Building2 size={16} />} label="Company" value={student.company.name} />
            </div>

            <div className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                <Briefcase size={16} /> Company profile
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{student.company.catchPhrase}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">BS: {student.company.bs}</p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                <MapPin size={16} /> Address
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{student.address.street}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{student.address.suite}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{student.address.city} {student.address.zipcode}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Geo: {student.address.geo.lat}, {student.address.geo.lng}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                <UserCircle2 size={16} /> Account details
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Username: {student.username}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Phone: {student.phone}</p>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  )
}

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-50">
      {icon}
      {label}
    </div>
   <p
  className="overflow-hidden break-words text-sm leading-6 text-slate-600 dark:text-slate-300"
  title={value}
>
  {value}
</p>
  </div>
)
