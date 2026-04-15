import { Outlet } from 'react-router-dom'
import { LanguageSwitch } from '../../i18n/LanguageSwitch'

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="mb-6 flex w-full max-w-3xl justify-end">
        <LanguageSwitch
          className="flex items-center rounded-full border border-slate-700 bg-slate-950 p-1"
          buttonClassName="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
          activeButtonClassName="bg-violet-700 text-white"
          inactiveButtonClassName="text-slate-400 hover:text-white"
        />
      </div>
      <div className="w-full max-w-sm md:max-w-3xl">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
