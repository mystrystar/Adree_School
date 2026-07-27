import { useState } from 'react'
import Logo from '../hooks/assets/adree_logo.svg'
import { APP_TITLE, DASHBOARD_LABEL, PROFILE_ARIA_LABEL, LOGOUT_TEXT } from '../constants/ui'

export const Header = ({ compact }: { compact?: boolean } = {}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    try {
      window.localStorage.setItem('student-dashboard-auth', 'false')
    } catch (e) {
      /* ignore */
    }
    // navigate back to login
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm transition dark:border-slate-800/70 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <img src={Logo} alt={APP_TITLE} className="h-14 w-auto" />
          {!compact ? (
            <div className="hidden sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
                {DASHBOARD_LABEL}
              </p>
              <h1 className="text-2xl font-bold text-[#173D6D]">{APP_TITLE}</h1>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            aria-label={PROFILE_ARIA_LABEL}
            onClick={() => setMenuOpen((s) => !s)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#173D6D] text-sm font-semibold text-white shadow-sm transition hover:bg-[#122d58]"
          >
            A
          </button>

          {menuOpen ? (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {LOGOUT_TEXT}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header
