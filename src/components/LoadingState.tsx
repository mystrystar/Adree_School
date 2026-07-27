import { motion } from 'framer-motion'

export const LoadingState = () => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0.2, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="animate-pulse rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
      >
        <div className="mb-4 h-4 w-24 rounded-full bg-slate-200" />
        <div className="mb-3 h-6 w-2/3 rounded-full bg-slate-200" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 rounded-full bg-slate-200" />
          <div className="h-4 w-4/5 rounded-full bg-slate-200" />
        </div>
      </motion.div>
    ))}
  </div>
)
