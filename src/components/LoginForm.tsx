import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion } from 'framer-motion'
import {
  LOGIN_TITLE,
  LOGIN_SUBTITLE,
  LOGIN_EMAIL_LABEL,
  LOGIN_PASSWORD_LABEL,
  LOGIN_EMAIL_REQUIRED,
  LOGIN_EMAIL_INVALID,
  LOGIN_PASSWORD_REQUIRED,
  LOGIN_PASSWORD_MIN,
  LOGIN_SUBMIT,
  LOGIN_SUBMITTING,
  LOGIN_DEMO_EMAIL,
  LOGIN_DEMO_PASSWORD,
} from '../constants/ui'
import type { LoginFormValues } from '../types/student'

const loginSchema = z.object({
  email: z.string().min(1, LOGIN_EMAIL_REQUIRED).email(LOGIN_EMAIL_INVALID),
  password: z.string().min(1, LOGIN_PASSWORD_REQUIRED).min(6, LOGIN_PASSWORD_MIN),
})

interface LoginFormProps {
  onSubmitSuccess: () => void
}

export const LoginForm = ({ onSubmitSuccess }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: LOGIN_DEMO_EMAIL,
      password: LOGIN_DEMO_PASSWORD,
    },
  })

  const onSubmit = (_values: LoginFormValues) => {
    onSubmitSuccess()
  }
  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[480px] rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-sm transition dark:border-slate-700 dark:bg-slate-950"
      noValidate
    >
      <div className="mb-6">
        <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-50">{LOGIN_TITLE}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{LOGIN_SUBTITLE}</p>
      </div>

      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">
        {LOGIN_EMAIL_LABEL}
      </label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        className="mb-3 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition h-14 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
        {...register('email')}
      />
      {errors.email && <p className="mb-3 text-sm text-rose-500">{errors.email.message}</p>}

      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">
        {LOGIN_PASSWORD_LABEL}
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        className="mb-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition h-14 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
        {...register('password')}
      />
      {errors.password && <p className="mb-3 text-sm text-rose-500">{errors.password.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-14 w-full rounded-xl bg-[#173D6D] px-6 text-base font-semibold text-white transition hover:bg-[#122d58] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? LOGIN_SUBMITTING : LOGIN_SUBMIT}
      </button>
    </motion.form>
  )
}
