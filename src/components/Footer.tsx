import FooterLogo from '../hooks/assets/adree school footer.png'
import { FOOTER_COPY, FOOTER_ALT } from '../constants/ui'

export const Footer = () => {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">

        <img
          src={FooterLogo}
          alt={FOOTER_ALT}
          className="h-12 w-[180px] object-cover object-left"
        />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {FOOTER_COPY}
        </p>

      </div>
    </footer>
  )
}

export default Footer